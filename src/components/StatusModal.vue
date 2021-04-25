<template>
    <b-modal :id="id" 
             :header-bg-variant="variant"
             :header-text-variant="textVariant"
             @hidden="onHiddenCallback"
             ok-only
             :ok-variant="'outline-' + variant">
        <template #modal-title>
            {{ title }}
        </template>
        <p v-html="message"></p>
    </b-modal>
</template>

<script>
    export default {
        name: 'StatusModal',
        props: {
            id: String,
            title: String,
            message: String,
            variant: String,
            textVariant: String,
            onHidden: Function
        },
        data() {
            return {
                onHiddenCallback: this.onHidden ?? function() {}
            }
        }
    };
</script>
