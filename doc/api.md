# **REST API documentation**

## **Index**
[Get polls](#getPolls)<br>
[Delete polls](#deletePolls)<br>
[Add a poll](#addPoll)<br>
[Edit a poll](#editPoll)<br>

# <a name="getPolls"></a> **Get Polls**

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

----

# <a name="deletePolls"></a> **Delete Polls**

  Delete all polls.

* **URL**

  /polls/

* **Method:**

  `DELETE`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
  * **Content:** `{ message: 'DELETE success'}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/",
      type : "DELETE",
      success : function(result) {
        console.log(result);
      }
    });
  ```

----

# <a name="addPoll"></a> **Add a Poll**

  Add a poll.

* **URL**

  /polls/

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
    
   `{
        title: 'My title',
        state: 'active'
    }`
  

* **Success Response:**

  * **Code:** 200
  * **Content:** `{ _id: '2321d123ewr1r1', title: 'My title', state: 'active'}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/",
      type : "POST",
      data: {
        title: 'My title',
        state: 'active'
      },
      success : function(result) {
        console.log(result);
      }
    });
  ```

----

# <a name="editPoll"></a> **Edit a Poll**

  Edit a poll.

* **URL**

  /polls/{id}

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    **Required:**
    
   `{
        title: 'My new title',
        state: 'closed'
    }`

* **Success Response:**

  * **Code:** 200
  * **Content:** `{ _id: '2321d123ewr1r1', title: 'Old title', state: 'Old state'}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/2321d123ewr1r1",
      type : "PUT",
      data: {
        title: 'My new title',
        state: 'closed'
      },
      success : function(result) {
        console.log(result);
      }
    });
  ```
