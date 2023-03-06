const props = {
    closeOnOverlayClick: {
        type: Boolean,
        value: true,
    },
    destroyOnClose: {
        type: Boolean,
        value: false,
    },
    items: {
        type: Array,
    },
    placement: {
        type: String,
        value: 'right',
    },
    showOverlay: {
        type: Boolean,
        value: true,
    },
    title: {
        type: String,
        value: '',
    },
    visible: {
        type: Boolean,
        value: false,
    },
    zIndex: {
        type: Number,
        value: 11500,
    },
};
export default props;
