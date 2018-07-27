/**
 *
 * @author 
 *
 */
class ShopListBean {
    public shopl_stack: number;
    public shopl_description: string;
    public shopl_discount: number;
    public shopl_discountPrice: number;
    public shopl_goods_type: number;
    public shopl_id: number;
    public shopl_item_code: number;
    public shopl_money_type: number;
    public shopl_name: string;
    public shopl_order: number;
    public shopl_price: number;
    public shopl_prop_id: number;


    public constructor(goodsobj: any) {
        this.shopl_stack = goodsobj.stack;
        this.shopl_description = goodsobj.description;
        this.shopl_discount = goodsobj.discount;
        this.shopl_discountPrice = goodsobj.discountPrice;
        this.shopl_goods_type = goodsobj.goods_type;
        this.shopl_id = goodsobj.id;
        this.shopl_item_code = goodsobj.item_code;
        this.shopl_money_type = goodsobj.money_type;
        this.shopl_name = goodsobj.name;
        this.shopl_order = goodsobj.order;
        this.shopl_price = goodsobj.price;
        this.shopl_prop_id = goodsobj.prop_id;
    }
}
