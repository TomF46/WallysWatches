module.exports = {
    future: {},
    purge: [],
    theme: {
        extend: {},
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#181619',
            'secondary': '#DDA74F',
            'danger': '#b41e00'
        }),
        textColor: theme => ({
            ...theme('colors'),
            'primary': '#181619',
            'secondary': '#DDA74F',
        }),
        borderColor: theme => ({
            ...theme('colors'),
            'primary': '#181619',
            'secondary': '#DDA74F',
        })
    },
    variants: {},
    plugins: []
};
