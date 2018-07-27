class Data_Invitation extends BaseData {
    private invitations: Array<Data_Invitation_Item>;

    constructor() {
        super();

    }

    protected setServiceData(data: any) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.invitations = [];
        for (let i = 0; i < data.invites.length; i++) {
            this.invitations.push(new Data_Invitation_Item(data.invites[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get invitationsArr() {
        return this.invitations;
    }
}