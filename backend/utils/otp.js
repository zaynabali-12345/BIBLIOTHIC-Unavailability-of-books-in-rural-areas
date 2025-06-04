exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  };
  
  exports.getExpiry = () => {
    const ttl = 5 * 60 * 1000; // 5 mins
    return Date.now() + ttl;
  };
  