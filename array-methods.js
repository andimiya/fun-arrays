var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances
  .filter((e, i) => {
    if (e.amount > 100000){
      return true;
    }
    else {
      return false;
    }
  });


/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = dataset.bankBalances
  .map((e, i) => {
    return {
      amount: e.amount,
      state: e.state,
      rounded: Math.round(e.amount)
    };
  });

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = dataset.bankBalances
  .map((e, i) => {
    return {
      amount: (Math.round(e.amount*10))/10,
      state: e.state
    };
  });

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = dataset.bankBalances
  .reduce((prev, curr, i) => {
    // console.log(prev.amount);
    return Math.round((parseFloat(prev) + parseFloat(curr.amount)) * 100) / 100;
  }, 0);

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */

var sumOfInterests = dataset.bankBalances

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = null;

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = dataset.bankBalances
  .reduce((accounts, currentAccount) => {
    if ( !accounts.hasOwnProperty( currentAccount.state) ) {
      accounts[currentAccount.state] = 0;
    }

    accounts[currentAccount.state] += parseFloat(currentAccount.amount);

    //round to cents
    // accounts [currentAccount.state] = Math.round()

    return accounts;
}, {});

var sumOfHighInterests = Object.keys(stateSums)
  .filter((state) => ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].indexOf( state) === -1)

//convert amount to be the interest
  .map((state) => {
    return {
      state: state,
      interest: Math.round(stateSums[state] * 18.9) / 100
    };
  })

//use only interest amounts that are greater than 50,000
  .filter ((account) => {
    return account.interest > 50000;
  })

//add all the states interests together
  .reduce((prevInterest, currInterest) => {
    return Math.round((prevInterest + currInterest.interest) * 100) / 100;
  }, 0);

console.log(sumOfHighInterests);

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
