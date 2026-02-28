export const generateContentPlan = async (businessData) => {
  const { name, category, tone, goal } = businessData;

  // Simulate API loading delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return [
    {
      day: "Monday",
      platform: "Instagram",
      caption: `🌟 Welcome to ${name}! We are your go-to destination for the best ${category} experience. Our commitment to quality and service sets us apart. Come visit us today and see the difference! ✨`,
      hashtags: [`#${name.replace(/\s/g,"")}`, `#${category}`, "#IndianBusiness", "#QualityFirst", "#ShopLocal"],
      bestTime: "9:00 AM",
      reach: 1800,
      engagement: 4.2
    },
    {
      day: "Tuesday",
      platform: "Facebook",
      caption: `👋 Hello everyone! At ${name}, we believe every customer deserves the best. Whether you are a first-time visitor or a loyal customer, we always have something special for you. Tag a friend who would love us! 💙`,
      hashtags: [`#${name.replace(/\s/g,"")}`, "#CustomerFirst", "#${category}Lover", "#SupportLocal", "#IndiaSmallBusiness"],
      bestTime: "12:00 PM",
      reach: 2200,
      engagement: 3.8
    },
    {
      day: "Wednesday",
      platform: "WhatsApp",
      caption: `🎉 Mid-week special from ${name}! We have got amazing offers waiting just for you. Our ${category} products are loved by thousands of happy customers. Contact us now to know more! 📲`,
      hashtags: [`#${name.replace(/\s/g,"")}`, "#MidWeekOffer", "#SpecialDeal", "#${category}Sale", "#BestPrice"],
      bestTime: "11:00 AM",
      reach: 1500,
      engagement: 5.1
    },
    {
      day: "Thursday",
      platform: "LinkedIn",
      caption: `🏆 ${name} is proud to serve our community with the finest ${category} products and services. Our journey has been driven by passion, dedication, and a commitment to excellence. Thank you for your continued support! 🙏`,
      hashtags: [`#${name.replace(/\s/g,"")}`, "#BusinessGrowth", "#${category}Industry", "#Entrepreneurship", "#MadeInIndia"],
      bestTime: "10:00 AM",
      reach: 3200,
      engagement: 3.5
    },
    {
      day: "Friday",
      platform: "Instagram",
      caption: `🎊 Friday vibes at ${name}! The weekend is here and we are ready to serve you with a smile. Stop by and experience why we are the most loved ${category} destination in town! ❤️`,
      hashtags: [`#${name.replace(/\s/g,"")}`, "#FridayVibes", "#Weekend", "#${category}Life", "#HappyCustomers"],
      bestTime: "6:00 PM",
      reach: 2800,
      engagement: 6.2
    },
    {
      day: "Saturday",
      platform: "Facebook",
      caption: `🛍️ Weekend special at ${name}! Saturdays are for treating yourself to the best ${category} experience. We have got everything you need and more. Visit us today and make your weekend memorable! 🌈`,
      hashtags: [`#${name.replace(/\s/g,"")}`, "#SaturdaySpecial", "#WeekendVibes", "#ShopNow", "#${category}Love"],
      bestTime: "11:00 AM",
      reach: 3500,
      engagement: 5.8
    },
    {
      day: "Sunday",
      platform: "WhatsApp",
      caption: `☀️ Happy Sunday from ${name}! Take a break and treat yourself today. Our ${category} offerings are perfect for your lazy Sunday. We are open and ready to serve you with love! 💛`,
      hashtags: [`#${name.replace(/\s/g,"")}`, "#SundaySpecial", "#RelaxAndShop", "#${category}Sunday", "#WeekendTreats"],
      bestTime: "10:00 AM",
      reach: 2100,
      engagement: 4.9
    }
  ];
};