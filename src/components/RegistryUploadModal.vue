<template>
    <div>
        <b-modal id="registry-upload-modal" header-bg-variant="info" header-text-variant="white" @show="resetModal" @hidden="resetModal">
            <template #modal-title>
                <b-icon-file-earmark-spreadsheet/>
                Upload new registry
            </template>
            <b-form>
                <b-alert variant="danger" :show="Boolean(errorMessage)">{{ errorMessage }}</b-alert>
                <b-form-group label="Registry:" label-for="registry-file" :state="Boolean(registryFile)" invalid-feedback="No selected file">
                    <b-form-file id="registry-file" 
                                v-model="registryFile" 
                                :state="Boolean(registryFile)"
                                placeholder="Choose a file or drop it here..."></b-form-file>
                </b-form-group>
            </b-form>
            <template #modal-footer={close}>
                <b-button @click="close()" variant="outline-secondary">Cancel</b-button>
                <b-button @click="sendRegistryFile()" variant="outline-info">Upload</b-button>
            </template>
        </b-modal>
        <SuccessModal title="Success" :message="successMessage" id="registry-upload-success-modal" variant="success"
                    :onHidden="() => { this.$router.go({ name: 'RegistryIndex' }) }"/>
    </div>
</template>

<script>
    import axios from 'axios';
    import SuccessModal from '@/components/StatusModal.vue';

    export default {
        name: 'RegistryUploadModal',
        components: {
            SuccessModal
        },
        data() {
            return {
                registryFile: null,
                errorMessage: null,
                successMessage: '',
            }
        },
        methods: {
            sendRegistryFile() {
                if (!this.registryFile) return;
                
                this.successMessage = `Registry "${this.registryFile.name}" uploaded successfully.`;

                let formData = new FormData();
                formData.append('registry', this.registryFile);

                axios.post(`${process.env.VUE_APP_BACKEND_BASE_URL}/api/v1/registry`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    validateStatus: () => {
                        return true;
                    }
                }).then(response => {
                    if (response.data.status == 'success') {
                        this.$bvModal.hide('registry-upload-modal');
                        this.successMessage = `Registry "${this.registryFile.name}" uploaded successfully.<br><br>Number of SPEED field changes: ${response.data.uniqueSpeedCount}`;
                        this.$bvModal.show('registry-upload-success-modal');
                    } else {
                        this.errorMessage = response.data.message;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetModal() {
                this.errorMessage = null;
                this.registryFile = null;
            },
            onSuccessModalHidden() {
                this.$router.go({ name: 'RegistryIndex' });
            }
        }
    }
</script>
