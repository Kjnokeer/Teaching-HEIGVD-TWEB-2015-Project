# **REST API documentation**

## **Index**
[Get polls](#getPolls)<br>
[Delete polls](#deletePolls)<br>
[Add a poll](#addPoll)<br>
[Edit a poll](#editPoll)<br>
[Get a poll](#getPoll)<br>
[Delete a poll](#deletePoll)<br><br>
[Get questions in a poll](#getQuestions)<br>
[Delete questions in a poll](#deleteQuestions)<br>
[Add a question in a poll](#addQuestion)<br>


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
        { _id: '56363e3ea9c49ee4030c5a2c', title: 'title', type: 'active' },
        { _id: '56363e3ea9c49ee4030c5ae1', title: 'title 2', type: 'closed'}
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
  * **Content:** `{ _id: '56363e3ea9c49ee4030c5a2c', title: 'My title', state: 'active'}`
 
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
  * **Content:** `{ _id: '56363e3ea9c49ee4030c5a2c', title: 'Old title', state: 'Old state'}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/56363e3ea9c49ee4030c5a2c",
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
  
----

# <a name="getPoll"></a> **Get a Poll**

  Get a poll.

* **URL**

  /polls/{id}

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    None
    
* **Success Response:**

  * **Code:** 200
  * **Content:** `{ _id: '56363e3ea9c49ee4030c5a2c', title: 'My title', state: 'state'}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/56363e3ea9c49ee4030c5a2c",
      type : "GET",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="deletePoll"></a> **Delete a Poll**

  Delete a poll.

* **URL**

  /polls/{id}

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200
  * **Content:** `{ message: 'DELETE success' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/56363e3ea9c49ee4030c5a2c",
      type : "DELETE",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="getQuestions"></a> **Get questions in a poll**

  Get all questions in a specified poll.

* **URL**

  /polls/{id}/questions

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200
  * **Content:** `[
                    {
                    _id: "56363e3ea9c49ee4030c5a2f",
                    title: "My question title 1 ?",
                    type: "free",
                    polls: "56363e3ea9c49ee4030c5a2c"
                    },
                    {
                    _id: "56363e3ea9c49ee4030c5a30",
                    title: "My question title 2",
                    type: "optional",
                    polls: "56363e3ea9c49ee4030c5a2c"
                    }
                ]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/56363e3ea9c49ee4030c5a2c/questions",
      type : "GET",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="deleteQuestions"></a> **Delete questions in a poll**

  Delete all questions in a specified poll.

* **URL**

  /polls/{id}/questions

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200
  * **Content:** `{ message: 'DELETE success' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/56363e3ea9c49ee4030c5a2c/questions",
      type : "DELETE",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="addQuestion"></a> **Add a question in a poll**

  Add a question in a specified poll.

* **URL**

  /polls/{id}/questions

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    **Required:**
    
   `{
        title: 'My question title',
        type: 'free'
    }`

* **Success Response:**

  * **Code:** 200
  * **Content:** ``{ _id: '56363e3ea9c49ee4030c5a2f', title: ''My question title', state: 'free', polls: '56363e3ea9c49ee4030c5a2c'}``
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/56363e3ea9c49ee4030c5a2c/questions",
      type : "POST",
      data: {
        title: 'My question title',
        type: 'free'
      },
      success : function(result) {
        console.log(result);
      }
    });
  ```
