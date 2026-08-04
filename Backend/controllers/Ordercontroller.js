const Order = require('../models/Order');
const Food = require('../models/Foods');

exports.CreateOrder = async (req, res) => {
  try {
    const {
      items,
      fullName,
      phoneNumber,
      deliveryAddress,
      paymentMethod,
      notes,
      promoCode,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'At least one item is required.' });
    }

    if (!fullName || !phoneNumber || !deliveryAddress || !paymentMethod) {
      return res.status(400).json({
        message: 'Full name, phone number, delivery address, and payment method are required.',
      });
    }

    if (!/^[0-9+\-\s]{7,20}$/.test(phoneNumber)) {
      return res.status(400).json({ message: 'Please enter a valid phone number.' });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const food = await Food.findById(item.food);

      if (!food) {
        return res.status(404).json({ message: 'Food not found.' });
      }

      const quantity = Number(item.quantity || 1);
      if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity should be more than 0.' });
      }

      const price = Number(food.price);
      subtotal += price * quantity;
      orderItems.push({
        food: food._id,
        name: food.name,
        quantity,
        price,
      });
    }

    const deliveryCharge = subtotal > 1000 ? 0 : 50;
    let discount = 0;
    const normalizedPromo = promoCode?.trim().toUpperCase();

    if (normalizedPromo === 'FOOD10' || normalizedPromo === 'SAVE10') {
      discount = Math.round(subtotal * 0.1);
    }

    const grandTotal = subtotal + deliveryCharge - discount;

    const order = await Order.create({
      customerId: req.user.id,
      items: orderItems,
      fullName,
      phoneNumber,
      deliveryAddress,
      paymentMethod,
      notes: notes || '',
      promoCode: promoCode || '',
      discount,
      subtotal,
      deliveryCharge,
      grandTotal,
    });

    return res.status(201).json({ message: 'Order created successfully.', orderId: order._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Could not create order.', error: error.message });
  }
};

exports.GetMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ message: 'Your orders are fetched successfully.', orders });
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch orders.', error: error.message });
  }
};

exports.GetAllOrders = async (req,res)=>{
  try{
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: 'All orders fetched successfully.', orders });
  }
  catch (error) {
    return res.status(500).json({ message: 'Could not fetch orders.', error: error.message });
  }
}

exports.GetOrderById = async (req,res)=>{
  try{
    const order = await Order.findById(req.params.id);
    if(!order){
      return res.status(404).json({message: "Order not found."})
    }
    return res.status(200).json({message: "Order found", order});
  }
  catch(error){
    return res.status(500).json({message : "Couldn't fetch orders", error : error.message});
  }
}

exports.UpdateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required.' });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id, {status}, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    return res.status(200).json({ message: 'Order status updated.', order });
  } catch (error) {
    return res.status(500).json({ message: 'Could not update order status.', error: error.message });
  }
}
