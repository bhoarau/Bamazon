//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
//create connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "Bamazon"
});


function start(){
//Displays the items for sale 
connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;

  console.log("Bamazon The Store With Everything for Everybody")
  console.log('____________________________________________________________________________________________________')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].Product + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].Stock);
    console.log('____________________________________________________________________________________________________')

  }


  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the ID of the product you are intrested in buying?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "qty",
      message: "How many would you like to purchase?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var whatToBuy = (ans.id)-1;
      var howMuchToBuy = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

      //quantity
      if(res[whatToBuy].Stock >= howMuchToBuy){
        connection.query("UPDATE Products SET ? WHERE ?", [
        {Stock: (res[whatToBuy].Stock - howMuchToBuy)},
        {ItemID: ans.id}
        ], function(err, result){
            if(err) throw err;
          console.log("Thank You, Your total will be $" + grandTotal.toFixed(2));
        });

        connection.query("SELECT * FROM Departments", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
              index = i;
            }
          }
          
          
        });

      } else{
        console.log("Sorry, well have more in Stock soon!");
      }

      reprompt();
    })
})
}

//purchase another
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another product?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("Thanks for shopping at Bamazon!");
    }
  });
}

start();