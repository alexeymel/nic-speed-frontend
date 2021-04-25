<template>
    <div>
        <b-card>
            <template #header>
                <div class="d-flex justify-content-between">
                    <h4 class="my-1">Registry :: {{ fileName }}</h4>
                    <div>
                        <router-link :to="{ name: 'RegistryIndex' }" class="btn btn-outline-info mr-3">
                            <b-icon-arrow-left/>
                            Back
                        </router-link>
                        <b-button v-b-modal.registry-remove-modal variant="outline-danger" title="Remove registry file.">
                            <b-icon-x/>
                            Remove
                        </b-button>
                    </div>
                </div>
            </template>
            <b-alert variant="danger" :show="Boolean(errorMessage)">{{ errorMessage }}</b-alert>
            <p>
                Number of SPEED field changes: {{ uniqueSpeedCount }}
            </p>
            <p class="mt-3">Shown {{ startRowOnPage }} - {{ endtRowOnPage }} rows from {{ rows }}</p>
            <b-table id="registry-data-table" 
                     small outlined 
                     head-variant="light" 
                     :fields="fields" 
                     :items="items" 
                     class="m-0 text-center"
                     :per-page="perPage"
                     :current-page="currentPage">
                <template #cell(#)="data">
                    {{ (data.index + perPage * (currentPage - 1)) + 1 }}
                </template>
            </b-table>
            <template #footer>
                <div class="d-flex justify-content-center">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="registry-data-table"
                    ></b-pagination>
                </div>
            </template>
        </b-card>
        <RegistryShowRemoveModal :fileName="fileName"/>
    </div>
</template>

<script>
    import axios from 'axios';
    import RegistryShowRemoveModal from '@/components/RegistryRemoveModal.vue'

    export default {
        name: 'RegistryShow',
        props: {
            fileName: String,
        },
        components: {
            RegistryShowRemoveModal
        },
        data() {
            return {
                perPage: 20,
                currentPage: 1,
                fields: ['#', 'hostname', 'nic', 'speed'],
                items: [],
                uniqueSpeedCount: 0,
                errorMessage: null,
            }
        },
        computed: {
            rows() {
                return this.items.length
            },
            startRowOnPage() {
                return this.perPage * (this.currentPage - 1) + (this.rows ? 1 : 0);
            },
            endtRowOnPage() {
                let rows = this.rows;
                let end = this.perPage * this.currentPage;

                return end > rows ? rows : end;
            }
        },
        mounted() {
            axios.get(`${process.env.VUE_APP_BACKEND_BASE_URL}/api/v1/registry/${this.fileName}`, {
                validateStatus: () => {
                    return true;
                }
            }).then(response => {
                if (response.data.status == 'success') {
                    this.items = response.data.data ?? [];
                    this.uniqueSpeedCount = response.data.uniqueSpeedCount ?? 0;
                } else {
                    this.errorMessage = response.data.message;                    }
            }).catch(error => console.log(error));
        }
    }
</script>
