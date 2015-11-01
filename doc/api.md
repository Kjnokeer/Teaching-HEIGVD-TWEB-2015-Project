# **REST API documentation**

## **Index**
[Show polls](#test)<br><br>

# <a name="test"></a> **Show Polls**

  Returns json array of polls.

* **URL**

  /polls/

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
  * **Content:** `[
        { _id: '23232dsad1acevd42', title: 'title', type: 'active' },
        { _id: '223saide3j2391i39', title: 'title 2', type: 'closed'}
    ]
    `
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/",
      dataType: "json",
      type : "GET",
      success : function(result) {
        console.log(result);
      }
    });
  ```
