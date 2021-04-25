<template>
    <div>
        <b-card no-body>
            <b-card-header class="d-flex justify-content-between">
                <h4 class="my-1">Registry</h4>
                <div>
                    <span class="mr-3">{{ itemsCount }} file(s) found</span>
                    <b-button v-b-modal.registry-upload-modal variant="outline-info">
                        <b-icon-file-earmark-spreadsheet/>
                        Upload new registry
                    </b-button>
                </div>
            </b-card-header>
            <b-table hover :fields="fields" :items="items" class="m-0 text-center">
                <template #cell(#)="data">
                    {{ data.index + 1 }}
                </template>
                <template #cell(fileName)="data">
                    <router-link :to="{ name: 'RegistryShow', params: { fileName: data.value } }" class="table-link text-info" title="Show registry file data.">
                        {{ data.value }}
                    </router-link>
                </template>
                <template #cell(size)="data">
                    {{ (data.value / 8 / 1024).toFixed(2) }} Kb
                </template>
                <template #cell(actions)="data">
                    <router-link :to="{ name: 'RegistryShow', params: { fileName: data.item.fileName } }" class="btn btn-outline-secondary btn-sm mr-1" title="Show registry file data.">
                        <b-icon-folder2-open/>
                        Open
                    </router-link>
                    <b-button @click="removeRegistry(data.item.fileName)" size="sm" variant="outline-danger" title="Remove registry file.">
                        <b-icon-x/>
                        Remove
                    </b-button>
                </template>
            </b-table>
        </b-card>
        <RegistryUploadModal/>
        <RegistryRemoveModal :fileName="fileNameToRemove"/>
    </div>
</template>

<script>
    import axios from 'axios';
    import RegistryUploadModal from '@/components/RegistryUploadModal.vue'
    import RegistryRemoveModal from '@/components/RegistryRemoveModal.vue'

    export default {
        name: 'RegistryIndex',
        components: {
            RegistryUploadModal,
            RegistryRemoveModal,
        },
        data() {
            return {
                fields: ['#', 'fileName', 'date', 'size', 'actions'],
                itemsCount: 0,
                items: [],
                fileNameToRemove: null,
            }
        },
        methods: {
            removeRegistry(fileName) {
                this.fileNameToRemove = fileName;
                this.$bvModal.show('registry-remove-modal');
            }
        },
        watch: {
            items(itemsNew) {
                this.itemsCount = itemsNew.length;
            }
        },
        mounted() {
            axios.get(`${process.env.VUE_APP_BACKEND_BASE_URL}/api/v1/registry`, {
                validateStatus: () => {
                    return true;
                }
            }).then(response => {
                this.items = response.data.registries ?? [];
            }).catch(error => console.log(error));
        }
    }
</script>

<style>
    .table td {
        vertical-align: middle;
    }

    .table .table-link:hover {
        text-decoration: none;
    }
</style>