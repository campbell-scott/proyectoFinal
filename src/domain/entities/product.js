class Product
{
  constructor(props)
  {
      this.id = props.id;
      this.title = props.title;
      this.category = props.category;
      this.description = props.description;
      this.code = props.code;
      this.thumbnail = props.thumbnail;
      this.price = props.price;
      this.stock = props.stock;
      this.status = props.status;
  }
}

export default Product;