const isTwoDaysOld = timeStamp => {
  let dt = new Date(timeStamp).getTime(); // Convert it to milliseconds
  let difference = Date.now() - dt;

  if (difference < 172800000) {
    // 172800000 is the number of milliseconds in 48hrs
    return false;
  } else {
    return true;
  }
};

module.exports = { isTwoDaysOld };
