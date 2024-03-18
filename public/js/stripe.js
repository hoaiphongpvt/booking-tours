const stripe = Stripe(
  'pk_test_51OvR4fBIzFlILRURdhnjS6rgWEt8PxmDoGmvgLQZzcy1eBRmgCgNtNdL3NG2hv9CLMBlCtCHrS6JLN04Fm0YDLSc00UsJ3w4z9',
);
export const bookTour = async (tourID, userID) => {
  try {
    //Get checkout session from API
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}/${userID}`,
    );
    console.log(session.data); // In ra dữ liệu nhận được từ API
    // Tiếp tục xử lý dữ liệu hoặc tạo checkout form tại đây

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.error('Error fetching checkout session:', error);
    // Xử lý lỗi nếu cần
  }
};
