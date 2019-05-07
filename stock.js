function maxProfit (input, adv=false) {
  /* Create a function maxProfit, which, given a list of stock prices for a given day, 
  returns the maximum profit that could have been made by buying a stock at the given price and then selling the stock later on. 
  For example if the input is: [45, 24, 35, 31, 40, 38, 11] then your program should return 
  16 because if you bought the stock at $24 and sold it at $40, a profit of $16 was made 
  and this is the largest profit that could be made. If no profit could have been made, return -1.*/

  // get all the stock buys that have greater value later in the array
  var stockMarketArray = [];
  for (var i = 0; i < input.length; i++) {
    for(var z = i + 1; z < input.length; z++) {
      stockMarketArray.push(getStockObject(i, z, input[i], input[z]));
    }
  }

  // feed the data into the function to get an object that returns the highest profit
  // and the buy days.
  var returnData = getHighestProfit(stockMarketArray);
  if(adv) {
    // If in advanced mode (adv = true) return an entire object with all buy and sell data
    return returnData;
  } else {
    // simply return the maxProfit as the question asks
    return returnData.profit;
  }
}

function getHighestProfit(stockMarketData) {
  // Data is an array of stockMarket objects
  var highMaxProfit = 0; // Keep track of profit
  var highObject = null;

  // these are indicies of the array that correspond to the buy and sell days
  var buyDay = -1;
  var sellDay = -1;
  
  if (stockMarketData) {
    stockMarketData.forEach(obj=> {
      // obj is an element of type object
      if (obj.profit > highMaxProfit) {
        // compare the current values with the current max profit and update if needed
        highMaxProfit = obj.profit;
        buyDay = obj.buyDay;
        sellDay = obj.sellDay;
        highObject = obj;
      }
    });
  }
  if (!highObject) {
    // if highObject is null (false, return a no profit object)
    var nullObj = getStockObject(-1, -1, 0, -1);
    return nullObj;
     
  } else {
    return highObject;
  }
}

function getStockObject(pbuyDay, psellDay, pbuyValue, psellValue) {
  // Create an object template, which helps us organize the structure of our data
  var gObject = {
    buyDay: pbuyDay,
    sellDay: psellDay,
    buyValue: pbuyValue,
    sellValue: psellValue,
    profit: (pbuyValue - psellValue) * -1
  };
  return gObject;
}

// Call the function
console.log(maxProfit([45, 24, 35, 31, 40, 38, 11])); // simple mode (returns max profit)
//console.log(maxProfit([45, 24, 35, 31, 40, 38, 11], true)); // advanced mode
console.log(maxProfit([45, 44, 43, 42, 40, 19, 17])); // test for no profit