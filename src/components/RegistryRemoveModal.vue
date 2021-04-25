<template>
    <div>
        <b-modal id="registry-remove-modal"
                title="Remove registry file"
                header-bg-variant="danger"
                header-text-variant="white"
                ok-variant="outline-danger"
                ok-title="Remove"
                cancel-variant="outline-secondary" @ok="onOk">
            <p>Please confirm that you want to remove"{{ fileName }}" registry.</p>
        </b-modal>
        <StatusModal :title="statusTitle" :message="statusMessage" id="registry-remove-status-modal" :variant="statusVariant"
                        :onHidden="() => {
                            this.$route.name.match('RegistryIndex') 
                                ? this.$router.go({ name: 'RegistryIndex'}) 
                                : this.$router.push({ name: 'RegistryIndex'}) 
                        }"/>
    </div>
</template>

<script>
    import axios from 'axios';
    import StatusModal from '@/components/StatusModal.vue';

    export default {
        name: 'RegistryRemoveModal',
        components: {
            StatusModal
        },
        props: {
            fileName: String
        },
        data() {
            return {
                statusMessage: `Registry "${this.fileName}" removed successfully.`,
                statusTitle: 'Success',
                statusVariant: 'success',
            }
        },
        watch: {
            fileName(newFileName) {
                this.statusMessage = `Registry "${newFileName}" removed successfully.`;
            }
        },
        methods: {
            onOk() {
                axios.delete(`${process.env.VUE_APP_BACKEND_BASE_URL}/api/v1/registry/${this.fileName}`, {
                    validateStatus: () => {
                        return true;
                    }
                })
                    .then(response => {
                        if (response.data.status != 'success') {
                            this.statusMessage = response.data.message;
                            this.statusTitle = 'Error';
                            this.statusVariant = 'danger';
                        }
                        
                        this.$bvModal.show('registry-remove-status-modal');
                    }).catch(error => console.log(error));
            }
        }
    };
</script>
