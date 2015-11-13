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
[Edit a question](#editQuestion)<br>
[Get a question](#getQuestion)<br>
[Delete a question](#deleteQuestion)<br><br>
[Get choices in a question](#getChoices)<br>
[Delete choices in a question](#deleteChoices)<br>
[Add a choices in a question](#addChoice)<br>
[Edit a choice](#editChoice)<br>
[Get a choice](#getChoice)<br>
[Delete a choice](#deleteChoice)<br>


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
  * **Content:** 

  ~~~json
{[
        { _id: '56363e3ea9c49ee4030c5a2c', title: 'title', type: 'active' },
        { _id: '56363e3ea9c49ee4030c5ae1', title: 'title 2', type: 'closed'}
]}
~~~ 

    `[
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
  
----

# <a name="editQuestion"></a> **Edit a question**

  Edit a specified question.

* **URL**

  /polls/*/questions/{id}

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    **Required:**
    
   `{
        title: 'My new question title',
        type: 'optional'
    }`

* **Success Response:**

  * **Code:** 200
  * **Content:** ``{ _id: '56363e3ea9c49ee4030c5a2f', title: ''My old question title', state: 'old state', polls: '56363e3ea9c49ee4030c5a2c'}``
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/*/questions/56363e3ea9c49ee4030c5a2f",
      type : "PUT",
      data: {
        title: 'My new question title',
        type: 'optional'
      },
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="addQuestion"></a> **Get a question**

  Get a specified question.

* **URL**

  /polls/*/questions/{id}

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200
  * **Content:** ``{ _id: '56363e3ea9c49ee4030c5a2f', title: ''My question title', state: 'free', polls: '56363e3ea9c49ee4030c5a2c'}``
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/*/questions/56363e3ea9c49ee4030c5a2f",
      type : "GET",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="deleteQuestion"></a> **Delete a question**

  Delete a specified question.

* **URL**

  /polls/*/questions/{id}

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200
  * **Content:** ``{ message: 'DELETE success'}``
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/*/questions/56363e3ea9c49ee4030c5a2f",
      type : "DELETE",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="getChoices"></a> **Get choices in a question**

  Get all choices in a specified questions.

* **URL**

  /polls/*/questions/{id}/choices

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
                    _id: "56363e3ea9c49ee4030c5a32",
                    key: "1234",
                    text: "choix 1",
                    questions: "56363e3ea9c49ee4030c5a2f"
                    },
                    {
                    _id: "56363e3ea9c49ee4030c5a33",
                    key: "4321",
                    text: "choix 2",
                    questions: "56363e3ea9c49ee4030c5a2f"
                    }
                ]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/*/questions/56363e3ea9c49ee4030c5a2f/choices",
      type : "GET",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="deleteChoices"></a> **Delete choices in a question**

  Delete all choices in a specified questions.

* **URL**

  /polls/*/questions/{id}/choices

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200
  * **Content:** `{ message: 'DELETE success'} `
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/*/questions/56363e3ea9c49ee4030c5a2f/choices",
      type : "DELETE",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="addChoice"></a> **Add a choice in a question**

  Add a choice in specified question.

* **URL**

  /polls/*/questions/{id}/choices

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    **Required:**
    
   `{
        key: 'My key',
        text: 'My text'
    }`

* **Success Response:**

  * **Code:** 200
  * **Content:** `{
                        _id: "56363e3ea9c49ee4030c5a32",
                        key: "My key",
                        text: "My text",
                        questions: "56363e3ea9c49ee4030c5a2f"
                    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/*/questions/56363e3ea9c49ee4030c5a2f/choices",
      type : "POST",
      data: {
        key: 'My key',
        text: 'My text'
      },
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="editChoice"></a> **Edit a choice**

  Edit a choice.

* **URL**

  /polls/*/questions/*/choices/{id}

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    **Required:**
    
   `{
        key: 'My new key',
        text: 'My new text'
    }`

* **Success Response:**

  * **Code:** 200
  * **Content:** `{
                        _id: "56363e3ea9c49ee4030c5a32",
                        key: "My old key",
                        text: "My old text",
                        questions: "56363e3ea9c49ee4030c5a2f"
                    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/*/questions/*/choices/56363e3ea9c49ee4030c5a32",
      type : "PUT",
      data: {
        key: 'My new key',
        text: 'My new text'
      },
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="getChoice"></a> **Get a choice**

  Get a choice.

* **URL**

  /polls/*/questions/*/choices/{id}

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   
   `id`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200
  * **Content:** `{
                        _id: "56363e3ea9c49ee4030c5a32",
                        key: "My key",
                        text: "My text",
                        questions: "56363e3ea9c49ee4030c5a2f"
                    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND 


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/polls/*/questions/*/choices/56363e3ea9c49ee4030c5a32",
      type : "GET",
      success : function(result) {
        console.log(result);
      }
    });
  ```
  
----

# <a name="deleteChoice"></a> **Delete a choice**

  Delete a choice.

* **URL**

  /polls/*/questions/*/choices/{id}

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
   
   `id`

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
      url: "/polls/*/questions/*/choices/56363e3ea9c49ee4030c5a32",
      type : "DELETE",
      success : function(result) {
        console.log(result);
      }
    });
  ```
