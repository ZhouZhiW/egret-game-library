/**
 *
 * @author 
 *
 */
class ShopModelBean {
    public shopm_description: string;
    public shopm_id: number;
    public shopm_name: string;
    public shopm_scope: number;
    public shopm_value: number;
    public constructor(description: string, id: number, name: string, scope: number, value: number) {
        this.shopm_description = description;
        this.shopm_id = id;
        this.shopm_name = name;
        this.shopm_scope = scope;
        this.shopm_value = value;
    }
}
