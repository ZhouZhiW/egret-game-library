import { User } from "@/service";
export default {
    props: {
        modal: Object
    },
    watch: {
        "modal.show": {
            handler: function () {
                if (this.modal.show && this.modal.row) {
                    this.modal.row.isAdmin = this.modal.row.isAdmin + "";
                    return (this.params = { ...this.params, ...this.modal.row });
                }
                this.modal.row = null;
            },
            immediate: true
        }
    },
    data() {
        return {
            params: this.initData(),
            rules: {
                name: { type: "string", required: true, message: "必填项" }
            }
        };
    },
    methods: {
        initData() {
            return {
                _id: undefined,
                userName: "",
                password: "",
                sex: "男",
                name: "",
                isAdmin: "false"
            };
        },
        async modalOk() {
            let validate = await this.$refs.form.validate();
            if (!validate) return;
            if (!this.params._id) {
                await this.create();
            } else {
                await this.update();
            }
            this.$Message.success("提交成功！");
            this.initModal("ok");
        },
        async create() {
            let { data } = await User.create(this.$QS.stringify(this.params));
        },
        async update() {
            let { data } = await User.update(this.$QS.stringify(this.params));
        },

        cancel() {
            this.initModal("cancel");
        },
        initModal(type) {
            this.params = this.initData();
            this.modal.show = false;
            this.$refs.form.resetFields();
            this.$emit(type);
        }
    }
};