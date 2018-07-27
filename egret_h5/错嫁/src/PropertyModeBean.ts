/**
 *
 * @author 
 *
 */
class PropertyModeBean {
    public propertym_item_id: number;
    public propertym_attribute_type: number;
    public propertym_price: number;
    public propertym_money_type: number;
    public propertym_value: number;
    public propertym_npc_id: number;
    public constructor(item_id: number, attribute_type: number, price: number, money_type: number, value: number, npc_id: number) {
        this.propertym_item_id = item_id;
        this.propertym_attribute_type = attribute_type;
        this.propertym_price = price;
        this.propertym_money_type = money_type;
        this.propertym_value = value;
        this.propertym_npc_id = npc_id;
    }
}
