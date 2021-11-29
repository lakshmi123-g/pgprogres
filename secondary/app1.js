const client = require('./connection1.js')
const express = require('express');
const app = express();
//const bodyParser = require("body-parser");
//app.use(bodyParser.json());
const cors = require('cors')
app.use(cors())




client.connect();


app.get('/users', (req, res) => {
    client.query(`SELECT table_name
    FROM information_schema.tables
    WHERE table_type='BASE TABLE'
    AND table_schema='public';
    `, (err, result) => {
        let output = [];
        if (!err) {
            for (let i = 0; i < result.rows.length; i++) {
                output.push({ table_name: result.rows[i].table_name })
            }
            res.send(output);
        }
    });
    client.end;
})

app.get("/users/:id", (req, res) => {
    client.query(`Select * from users where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})


app.get("/secondary", (req, res) => {
    client.query(
        `select table_schema, 
      table_name, 
      (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
  from (
  select table_name, table_schema, 
        query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
  from information_schema.tables
  where table_schema = 'public'
  ) t
  
  `,
        (err, result) => {
            let output = []
            if (!err) {
                for (let i = 0; i < result.rows.length; i++) {
                    output.push({ table_name: result.rows[i].table_name, row_count: result.rows[i].row_count })
                }
                res.send(output);

            }
        }
    );
    client.end;
});

//let a = [];
{/*let b = [];

let tablenames = [
  "table1",
  "table2",
  "table3",
  "table4",
  "table5",
  "table6",
  "table7",
  "table8",
  "table9",
  "table10",
];

for (i = 0; i < tablenames.length; i++) {
  for (i = 0; i < tablenames.length; i++) {
    let a = tablenames[i];
    query = "Select count(*)  as users from " + a;
    client.query(query, (err, result) => {
      if (!err) {
        b.push(result.rows);
      }

      client.end;
    });
  }
}
app.get("/userscountall/", (req, res) => {
  res.send(b);
});*/}
//console.log(a);



app.listen(3001, () => {
    console.log("Server is now listening at port 3001");
});



