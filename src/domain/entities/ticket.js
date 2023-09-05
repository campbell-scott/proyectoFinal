class Ticket
{
  constructor(props)
  {
      this.id = props.id;
      this.purchaseDateTime = props.purchaseDateTime;
      this.purchaser = props.purchaser;
      this.amount = props.amount;
      this.status = props.status;
      this.products = props.products;
  }
}

export default Ticket;