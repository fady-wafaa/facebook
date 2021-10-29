const cron = require("node-cron");
const nodemailer = require("nodemailer");

require('dotenv').config();

// !  Send Email pdf daliy day 
const daliyEmail = async()=>{
    let transporter = nodemailer.createTransport({
    
        service:'gmail',
        auth: {
          user: process.env.USER_EMAIL, 
          pass: process.env.PASS_EMAIL, 
        }
        ,
        tls: {
          rejectUnauthorized: false
      }
      });
     await cron.schedule('*/2 * * * * *', async() => {
          await transporter.sendMail({
              from: "project node.js", 
              to: "fadywafaa36@gmail.com", 
              subject: "pdf users", 
              text: "pdf users", 
              html: "hello", 
              attachments: [{  
                  filename: 'report.pdf',
                    path: 'invoice.pdf', // stream this file
                    contentType:"application/pdf"
                }]
            });
            console.log("fadiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
            
            
      });

}
module.exports = daliyEmail