const app = Vue.createApp({
    data: function () {
        return {
            connections: [],
            alert: null,
            ts: 0,
        }
    },
    mounted() {
        this.getData();
        setInterval(this.getData, 1000);
    },
    computed: {
        all_conns: function () {
            let arr = Array.from(this.connections);
            arr.sort(function (a, b) {
                return a.scope.localeCompare(b.scope) || a.user.localeCompare(b.user);
            });
            return this.ts && arr;
        },
    },
    methods: {
        getData: function () {
            let vm = this;

            fetch('/api/connections')
                .then(resp => resp.json())
                .then(function (data) {
                    vm.connections = data;
                    vm.ts += 1;
                });
        },
        dt: dtShort,
    },
});

app.mount('#app');
