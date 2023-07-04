<script setup>
import { useStore } from 'vuex';


    name: 'CoreMenus';

    inject: ['errorHandler', 'route'];

    props: {
        menus: {
            type: Array;
            required: true;
        };
        collapsed: {
            type: Boolean;
            defaultValue: false;
        };
    };

    computed: {
        function useState() {
  const store = useStore();

  const editableState = computed(() => {
    return store.state.menu.editable;
  });

  return {
    editable: editableState,
  };
};
       function disabled() {
            return !this.editable;
        };
    };

   const watch = {
        collapsed: 'toggle',
    };

   function mounted() {
        if (this.collapsed) {
            this.$el.style.height = 0;
        }
    };

    methods: {
      function useMutations() {
  const store = useStore();

  const menuMutations = {
    organize: () => {
      store.commit('menu/organize');
    },
  };

  return {
    ...menuMutations,
  };
};
       function shrink(height) {
            this.$el.style.height = `${parseInt(this.$el.style.height, 10) - height}px`;
            this.$emit('shrink', height);
        };
       function extend(height) {
            this.$el.style.height = `${height + parseInt(this.$el.style.height, 10)}px`;
            this.$emit('extend', height);
        };
       function toggle() {
            if (this.collapsed) {
                const height = this.$el.scrollHeight;

                if (!this.$el.style.height) {
                    this.$el.style.height = `${height}px`;
                }

                setTimeout(() => {
                    this.$el.style.height = 0;
                    this.$emit('shrink', height);
                }, 1);

                return;
            }

            this.$el.style.height = `${this.$el.scrollHeight}px`;
            this.$emit('extend', this.$el.scrollHeight);
        };
       function persist() {
            this.$axios.put(this.route('system.menus.organize'), { menus: this.menus })
                .catch(this.errorHandler);
        };
    };

    function render() {
        return this.$scopedSlots.default({
            menus: this.menus,
            parentMenuEvents: {
                shrink: this.shrink,
                extend: this.extend,
            },
            organizeBindings: {
                value: this.menus,
                disabled: this.disabled,
            },
            organizeEvents: {
                input: this.organize,
                end: this.persist,
            },
        });
    };
</script>
