
// const mysql = require("mysql");
// const mySqlConnection = mysql.createConnection({
//     host:"sql12.freemysqlhosting.net",
//     port: "3306",
//     database:"sql12719720",
//     user: "sql12719720",
//     password: "PdUN2yFQPB",
// })

// // mySqlConnection.connect(function (err) {
// //     if(err) {
// //         console.log("Error");
// //     }
// //     else{
// //         console.log("connected");
// //     }
// // })

// export const insertQuery =() => {
//     mySqlConnection.connect(function(error){
//         if(error) throw error;
//         mySqlConnection.query(`insert into MENU_ITEMS 
//             ( menu_id,name,variant_type,price,discount,is_active,is_delete,description,image,created_at,updated_at) VALUES
//         ( 001,"Orange Juice","Juice",80.00,10,1,0,"Tasty","img_url","2024-02-12 05:05:05","2024-02-12 05:05:05") `, function (err, result, fields) {
//             // mySqlConnection.query("select * from MENU_ITEMS", function (err, result, fields) {
//                 if(err) throw err;
//             console.log("inserted >>>", result)
//         })
//     })
// }
  