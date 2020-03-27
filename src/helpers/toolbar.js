export default {
    groups: [
        {
            label: 'Basic markup',
            key: 'basic',
            items: []
        },
        {
            label: 'Advanced markup',
            key: 'advanced',
            items: []
        },
        {
            label: 'Custom',
            key: 'custom',
            items: []
        },
        {
            label: 'Other',
            key: 'other',
            items: []
        }
    ],
    buttons: [
        {
            label: 'Bold',
            icon: 'fas fa-bold',
            key: 'bold',
            disabledOnPreview: true,
            group: 'basic'
        },
        {
            label: 'Italic',
            icon: 'fas fa-italic',
            key: 'italic',
            disabledOnPreview: true,
            group: 'basic'
        },
        {
            label: 'Strikethrough',
            icon: 'fas fa-strikethrough',
            key: 'strikethrough',
            disabledOnPreview: true,
            group: 'basic'
        },
        {
            label: 'Link',
            icon: 'fas fa-link',
            key: 'link',
            disabledOnPreview: true,
            group: 'advanced'
        },
        {
            label: 'Image',
            icon: 'fas fa-image',
            key: 'image',
            disabledOnPreview: true,
            group: 'advanced'
        },
        {
            label: 'Quote',
            icon: 'fas fa-quote-right',
            key: 'quote',
            disabledOnPreview: true,
            group: 'advanced'
        },
        {
            label: 'Code block',
            icon: 'fas fa-code',
            key: 'code',
            disabledOnPreview: true,
            group: 'advanced'
        },
        {
            label: 'Preview',
            icon: 'fas fa-eye',
            key: 'preview',
            group: 'other'
        }
    ]
};