### Theory:
A queue data structure can be implemented using Linked-list.The implementation of queue data structure using Linked-list is very simple. Just define Linked-list  and insert or delete the values into that Linked-list by using FIFO (First In First Out) principle with the help of pointer 'front' and 'rear'. Initially both 'front' and 'rear' are set to "Null". Whenever, we want to insert a new value into the queue, locate 'rear' value by new address and then insert at that position. Whenever we want to delete a value from the queue, then delete the element which is at 'front' position and increment 'front' to next address.

<b>Queue Operations using Linked-list</b><br>
**Queue data structure using Linked-list can be implemented as follows...**

**Before we implement actual operations, first follow the below steps to Run the program from the "Main" function.**

     Step 1: Start
     Step 2: Declare global pointer variable front and rear
     Step 3: End
     
<b>enQueue(value) :</b> Inserting value into the queue<br>
In a queue data structure, enQueue() is a function used to insert a new element into the queue. In a queue, the new element is always inserted at rear position. The enQueue() function takes one integer value as a parameter and inserts that value into the queue. We can use the following steps to insert an element into the queue...<br>

     Step 1: Start
     Step 2: create new node *t
     Step 2: If t equals null
                      Display Queue is full
                   Else
                      Declare variable data
                      Display enter value
                      Read variable data
                      Set *t.value <- data
                      If front equals null
                           front <- t
                           rear <- t
                      Else
                           *rear.next <- t
                           rear <- *rear.next
     Step 3: End
     
<b>deQueue() :</b> Deleting a value from the Queue<br>
In a queue data structure, deQueue() is a function used to delete an element from the queue. In a queue, the element is always deleted from front position. The deQueue() function does not take any value as parameter. We can use the following steps to delete an element from the queue...<br>

     Step 1: Start
     Step 2: If front equals null
                      Display Queue is empty
                   Else
                      Declare node pointer *t
                      Set t <- front
                      Set front <- *front.next
                      Free t
     Step 3: End
     
<b>display() :</b> Displays the elements of a Queue<br>
We can use the following steps to display the elements of a queue...<br>

     Step 1: Start
     Step 2: If front not equals null
                      2.1: Declare node pointer *i
                             Set i <- front
                      2.2: Repeat the step until i not equals null
                             Display value at i is *i.value
                             Set i <- *i.next
                   Else
                      Display Queue is empty
     Step 3: End
 
<b>isEmpty() :</b>To Check either Queue is empty or not<br>

     Step 1: Start
     Step 2: If front equals null
                      Display Queue is empty
                   Else
                      Display Queue is not empty
     Step 3: End
