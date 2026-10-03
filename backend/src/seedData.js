export const practicalSeedContent = [
  {
    practicalNumber: 1,
    title: "Selection Sort and Insertion Sort",
    shortDescription: "Implement and compare selection sort and insertion sort with complexity analysis.",
    topic: "Sorting",
    aim: "Execute selection sort and insertion sort and analyze best, average and worst-case time complexity.",
    objective:
      "To understand comparison-based sorting and evaluate time complexity behavior for sorted, random and reverse input data.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "Selection sort repeatedly selects the minimum element and places it in the correct position. Insertion sort builds a sorted portion by inserting each element at its proper place. Selection sort performs O(n²) comparisons in all cases. Insertion sort is O(n) in best case and O(n²) in average and worst cases.",
    algorithm:
      "Selection Sort:\n1. Start from index 0.\n2. Find minimum element in unsorted part.\n3. Swap with current index.\n4. Repeat for all positions.\n\nInsertion Sort:\n1. Start from second element.\n2. Store key and shift larger elements to right.\n3. Insert key in proper location.\n4. Repeat until array end.",
    program:
      "#include <stdio.h>\n\nvoid selectionSort(int a[], int n){\n  for(int i=0;i<n-1;i++){\n    int min=i;\n    for(int j=i+1;j<n;j++) if(a[j]<a[min]) min=j;\n    int t=a[i]; a[i]=a[min]; a[min]=t;\n  }\n}\n\nvoid insertionSort(int a[], int n){\n  for(int i=1;i<n;i++){\n    int key=a[i], j=i-1;\n    while(j>=0 && a[j]>key){ a[j+1]=a[j]; j--; }\n    a[j+1]=key;\n  }\n}\n\nint main(){\n  int n; scanf(\"%d\", &n);\n  int a[100], b[100];\n  for(int i=0;i<n;i++){ scanf(\"%d\", &a[i]); b[i]=a[i]; }\n  selectionSort(a,n); insertionSort(b,n);\n  printf(\"Selection: \"); for(int i=0;i<n;i++) printf(\"%d \",a[i]);\n  printf(\"\\nInsertion: \"); for(int i=0;i<n;i++) printf(\"%d \",b[i]);\n  return 0;\n}",
    procedure:
      "1. Read array size and elements.\n2. Execute selection sort and display sorted output.\n3. Execute insertion sort on same data and display output.\n4. Discuss complexity for best/average/worst cases.",
    sampleOutput:
      "Input: 5\n64 25 12 22 11\nSelection: 11 12 22 25 64\nInsertion: 11 12 22 25 64",
    conclusion:
      "Both algorithms sort correctly. Insertion sort performs better for nearly sorted data while selection sort performs fixed comparisons.",
  },
  {
    practicalNumber: 2,
    title: "Linear Search and Binary Search",
    shortDescription: "Implement linear and binary search and compare performance.",
    topic: "Searching",
    aim: "Implement linear search and binary search and compare their performance.",
    objective: "To learn sequential and divide-and-conquer searching techniques.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "Linear search checks each element sequentially. Binary search requires sorted data and repeatedly compares middle element to reduce search space by half. Linear search is O(n), binary search is O(log n).",
    algorithm:
      "Linear Search: Traverse each element, compare with key, return index when found.\nBinary Search: Set low=0, high=n-1, find mid, compare and update bounds until key found or low>high.",
    program:
      "#include <stdio.h>\n\nint linear(int a[], int n, int key){\n  for(int i=0;i<n;i++) if(a[i]==key) return i;\n  return -1;\n}\n\nint binary(int a[], int n, int key){\n  int l=0,h=n-1;\n  while(l<=h){\n    int m=(l+h)/2;\n    if(a[m]==key) return m;\n    if(a[m]<key) l=m+1; else h=m-1;\n  }\n  return -1;\n}\n\nint main(){\n  int n,key; scanf(\"%d\",&n);\n  int a[100]; for(int i=0;i<n;i++) scanf(\"%d\",&a[i]);\n  scanf(\"%d\",&key);\n  printf(\"Linear index: %d\\n\", linear(a,n,key));\n  printf(\"Binary index: %d\\n\", binary(a,n,key));\n  return 0;\n}",
    procedure:
      "1. Read sorted array and search key.\n2. Execute linear search.\n3. Execute binary search.\n4. Compare number of comparisons and complexity.",
    sampleOutput: "Input: 6\n2 5 7 11 14 20\n11\nLinear index: 3\nBinary index: 3",
    conclusion: "Binary search is significantly faster than linear search for large sorted datasets.",
  },
  {
    practicalNumber: 3,
    title: "Stack Using Array",
    shortDescription: "Implement stack operations push, pop and peek using array.",
    topic: "Stack",
    aim: "Implement stack using array and perform push, pop, and peek operations.",
    objective: "To understand LIFO data structure and practical stack operations.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "Stack is a linear data structure that follows LIFO. Push inserts an element at top, pop removes from top, and peek reads top without deletion. Applications include expression evaluation, recursion and backtracking.",
    algorithm:
      "Push: if top==MAX-1 overflow else a[++top]=x.\nPop: if top==-1 underflow else return a[top--].\nPeek: if top==-1 empty else return a[top].",
    program:
      "#include <stdio.h>\n#define MAX 5\nint st[MAX], top=-1;\n\nvoid push(int x){ if(top==MAX-1) printf(\"Overflow\\n\"); else st[++top]=x; }\nvoid pop(){ if(top==-1) printf(\"Underflow\\n\"); else printf(\"Popped %d\\n\", st[top--]); }\nvoid peek(){ if(top==-1) printf(\"Empty\\n\"); else printf(\"Top %d\\n\", st[top]); }\n\nint main(){ push(10); push(20); push(30); peek(); pop(); peek(); return 0; }",
    procedure:
      "1. Initialize top=-1.\n2. Perform push operations.\n3. Perform pop operation.\n4. Display top using peek and verify LIFO behavior.",
    sampleOutput: "Top 30\nPopped 30\nTop 20",
    conclusion: "Stack implemented using array correctly performs LIFO operations.",
  },
  {
    practicalNumber: 4,
    title: "Infix, Postfix and Prefix Expression",
    shortDescription: "Convert infix expression and evaluate postfix using stack.",
    topic: "Stack",
    aim: "Convert infix expression to postfix/prefix and evaluate postfix expression using stack.",
    objective: "To apply stack in expression conversion and evaluation.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "Infix notation places operators between operands. Postfix and prefix simplify machine evaluation. Stack is used for precedence handling and parenthesis matching during conversion.",
    algorithm:
      "1. Scan infix from left to right.\n2. Output operands directly.\n3. Push operators based on precedence and associativity.\n4. Pop until matching parenthesis.\n5. Evaluate postfix using operand stack.",
    program:
      "#include <stdio.h>\n#include <ctype.h>\n#include <string.h>\nchar st[100]; int top=-1;\nint prec(char c){ if(c=='^') return 3; if(c=='*'||c=='/') return 2; if(c=='+'||c=='-') return 1; return 0; }\nvoid push(char c){ st[++top]=c; } char pop(){ return st[top--]; }\n\nint main(){\n  char in[100], out[100]; int k=0; scanf(\"%s\", in);\n  for(int i=0; in[i]; i++){\n    char c=in[i];
    if(isalnum(c)) out[k++]=c;
    else if(c=='(') push(c);
    else if(c==')'){ while(top!=-1 && st[top]!='(') out[k++]=pop(); pop(); }
    else { while(top!=-1 && prec(st[top])>=prec(c)) out[k++]=pop(); push(c);} }
  while(top!=-1) out[k++]=pop(); out[k]='\\0';
  printf(\"Postfix: %s\\n\", out); return 0; }
",
    procedure:
      "1. Input infix expression.\n2. Convert to postfix/prefix with stack.\n3. Evaluate postfix expression.\n4. Verify correctness with manual computation.",
    sampleOutput: "Input: (A+B)*C\nPostfix: AB+C*",
    conclusion: "Stack-based conversion produces correct postfix/prefix form and supports evaluation.",
  },
  {
    practicalNumber: 5,
    title: "Linear Queue and Circular Queue",
    shortDescription: "Implement queue operations for linear and circular queue.",
    topic: "Queue",
    aim: "Implement linear queue and circular queue using arrays and perform operations.",
    objective: "To understand FIFO behavior and overcome false overflow via circular queue.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "Queue follows FIFO. Enqueue inserts at rear and dequeue removes from front. Linear queue may waste space after deletions. Circular queue reuses free locations by wrapping around.",
    algorithm:
      "Linear: enqueue rear++, dequeue front++. Circular: rear=(rear+1)%MAX, front=(front+1)%MAX with full/empty checks.",
    program:
      "#include <stdio.h>\n#define MAX 5\nint q[MAX], f=-1, r=-1;\nvoid enqueue(int x){ if((r+1)%MAX==f) printf(\"Full\\n\"); else { if(f==-1) f=0; r=(r+1)%MAX; q[r]=x; } }\nvoid dequeue(){ if(f==-1) printf(\"Empty\\n\"); else { printf(\"Deleted %d\\n\", q[f]); if(f==r) f=r=-1; else f=(f+1)%MAX; } }\nint main(){ enqueue(1); enqueue(2); enqueue(3); dequeue(); enqueue(4); return 0; }",
    procedure:
      "1. Initialize front and rear.\n2. Perform enqueue and dequeue.\n3. Display queue content for linear and circular logic.\n4. Validate FIFO order.",
    sampleOutput: "Deleted 1",
    conclusion: "Circular queue handles FIFO efficiently and avoids memory wastage seen in linear queue.",
  },
  {
    practicalNumber: 6,
    title: "Singly Linked List",
    shortDescription: "Implement insertion, deletion and traversal in singly linked list.",
    topic: "Linked List",
    aim: "Implement singly linked list with insertion, deletion, and traversal operations.",
    objective: "To understand dynamic memory based linear data structures.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "A singly linked list consists of nodes storing data and next pointer. It allows dynamic growth and efficient insertion/deletion at known positions.",
    algorithm:
      "Insertion at beginning: create node, set new->next=head, head=new.\nDeletion by key: traverse with prev pointer and reconnect links.\nTraversal: move current from head to NULL and print data.",
    program:
      "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct node{ int data; struct node *next; }Node;\nNode *head=NULL;\nvoid insertBeg(int x){ Node *n=malloc(sizeof(Node)); n->data=x; n->next=head; head=n; }\nvoid del(int x){ Node *t=head,*p=NULL; while(t&&t->data!=x){ p=t; t=t->next; } if(!t) return; if(!p) head=t->next; else p->next=t->next; free(t);} \nvoid display(){ for(Node*t=head;t;t=t->next) printf(\"%d -> \",t->data); printf(\"NULL\\n\"); }\nint main(){ insertBeg(10); insertBeg(20); display(); del(10); display(); return 0; }",
    procedure:
      "1. Create node structure with data and next pointer.\n2. Insert nodes in list.\n3. Traverse and display list.\n4. Delete a node and verify list.",
    sampleOutput: "20 -> 10 -> NULL\n20 -> NULL",
    conclusion: "Singly linked list supports dynamic insertion, deletion and traversal without contiguous memory.",
  },
  {
    practicalNumber: 7,
    title: "Doubly Linked List and Circular Linked List",
    shortDescription: "Implement operations for doubly and circular linked list.",
    topic: "Linked List",
    aim: "Implement doubly linked list and circular linked list operations.",
    objective: "To understand bidirectional traversal and circular node linking.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "Doubly linked list has prev and next pointers, supporting forward and backward traversal with easier deletion. Circular linked list connects last node to first, useful for round-robin tasks. Doubly list uses more memory; circular operations require careful pointer updates.",
    algorithm:
      "DLL insertion: create node, update prev/next links on both sides.\nDLL deletion: reconnect prev and next nodes and free node.\nCLL insertion: link new node and adjust last->next to head.",
    program:
      "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct node{ int d; struct node *prev,*next; }Node;\nNode *head=NULL;\nvoid insert(int x){ Node*n=malloc(sizeof(Node)); n->d=x; n->prev=NULL; n->next=head; if(head) head->prev=n; head=n; }\nvoid display(){ for(Node*t=head;t;t=t->next) printf(\"%d \",t->d); printf(\"\\n\"); }\nint main(){ insert(1); insert(2); insert(3); display(); return 0; }",
    procedure:
      "1. Implement node structures for doubly and circular lists.\n2. Perform insertion and deletion.\n3. Traverse and display list.\n4. Compare advantages and disadvantages.",
    sampleOutput: "3 2 1",
    conclusion: "Doubly and circular linked lists provide flexible traversal and cyclic processing for specialized applications.",
  },
  {
    practicalNumber: 8,
    title: "Binary Tree Traversals",
    shortDescription: "Implement binary tree and inorder/preorder/postorder traversals.",
    topic: "Tree",
    aim: "Implement binary tree and perform inorder, preorder, and postorder traversals.",
    objective: "To understand hierarchical data representation and recursive traversal logic.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "Binary tree has nodes with left and right child. Traversals visit nodes in different orders: inorder (LNR), preorder (NLR), and postorder (LRN).",
    algorithm:
      "Inorder(T): if T not null, Inorder(T->left), visit, Inorder(T->right).\nPreorder(T): visit, left, right.\nPostorder(T): left, right, visit.",
    program:
      "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct node{ int d; struct node*l,*r; }Node;\nNode*newNode(int x){ Node*n=malloc(sizeof(Node)); n->d=x; n->l=n->r=NULL; return n; }\nvoid in(Node*t){ if(!t) return; in(t->l); printf(\"%d \",t->d); in(t->r);} \nvoid pre(Node*t){ if(!t) return; printf(\"%d \",t->d); pre(t->l); pre(t->r);} \nvoid post(Node*t){ if(!t) return; post(t->l); post(t->r); printf(\"%d \",t->d);} \nint main(){ Node*root=newNode(1); root->l=newNode(2); root->r=newNode(3); in(root); printf(\"\\n\"); pre(root); printf(\"\\n\"); post(root); return 0;}",
    procedure:
      "1. Create binary tree nodes.\n2. Implement recursive traversal functions.\n3. Execute inorder, preorder and postorder.\n4. Verify traversal sequences.",
    sampleOutput: "Inorder: 2 1 3\nPreorder: 1 2 3\nPostorder: 2 3 1",
    conclusion: "Binary tree traversal methods correctly process nodes for different processing needs.",
  },
  {
    practicalNumber: 9,
    title: "BFS, DFS and Hashing",
    shortDescription: "Implement graph traversals BFS/DFS and hashing with collision handling.",
    topic: "Graph",
    aim: "Implement BFS and DFS for graph traversal and hashing with collision handling techniques.",
    objective: "To understand graph traversal strategies and hashing methods such as chaining.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "BFS explores level by level using queue. DFS explores depth-first using recursion/stack. Hashing maps keys to table indices. Collisions can be handled using chaining where each slot stores a linked list.",
    algorithm:
      "BFS: enqueue source, mark visited, dequeue and visit neighbors.\nDFS: visit source, recursively visit unvisited neighbors.\nHashing with chaining: index = key % m, insert node in linked list at index.",
    program:
      "#include <stdio.h>\nint g[5][5]={{0,1,1,0,0},{1,0,0,1,0},{1,0,0,1,1},{0,1,1,0,1},{0,0,1,1,0}},v[5];\nvoid dfs(int s){ v[s]=1; printf(\"%d \",s); for(int i=0;i<5;i++) if(g[s][i]&&!v[i]) dfs(i);} \nvoid bfs(int s){ int q[10],f=0,r=0; for(int i=0;i<5;i++) v[i]=0; q[r++]=s; v[s]=1; while(f<r){ int x=q[f++]; printf(\"%d \",x); for(int i=0;i<5;i++) if(g[x][i]&&!v[i]){ v[i]=1; q[r++]=i; } } }\nint main(){ for(int i=0;i<5;i++) v[i]=0; printf(\"DFS: \"), dfs(0); printf(\"\\nBFS: \"), bfs(0); return 0;}",
    procedure:
      "1. Represent graph using adjacency matrix/list.\n2. Execute BFS using queue.\n3. Execute DFS using recursion or stack.\n4. Implement hash table insertion/search with chaining.\n5. Compare traversal outputs and collision handling.",
    sampleOutput: "DFS: 0 1 3 2 4\nBFS: 0 1 2 3 4",
    conclusion: "BFS and DFS traverse graphs effectively, and chaining resolves hash collisions robustly.",
  },
  {
    practicalNumber: 10,
    title: "Library Management System Using Data Structures",
    shortDescription: "Mini project implementing library management with linked list and queue.",
    topic: "Mini Project",
    aim: "Develop a mini project using data structures to solve a real-world problem.",
    objective: "To integrate linked list and queue in a practical library workflow.",
    apparatus: "Computer system with C compiler / IDE.",
    theory:
      "Library management stores books in dynamic records. Linked list is used for add/search/display operations. Queue is used for issue requests based on FCFS order. This design supports extensibility and simple memory management.",
    algorithm:
      "1. Add Book: create node and append in linked list.\n2. Search Book: traverse list by id/title.\n3. Issue Book: enqueue request and mark status.\n4. Return Book: update status and dequeue processed request.\n5. Display Books: traverse and print all records.",
    program:
      "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\ntypedef struct book{ int id; char title[50]; int issued; struct book*next; }Book;\nBook*head=NULL;\nvoid add(int id,const char*t){ Book*b=malloc(sizeof(Book)); b->id=id; strcpy(b->title,t); b->issued=0; b->next=head; head=b; }\nBook*find(int id){ for(Book*b=head;b;b=b->next) if(b->id==id) return b; return NULL; }\nvoid display(){ for(Book*b=head;b;b=b->next) printf(\"%d %s %s\\n\",b->id,b->title,b->issued?\"Issued\":\"Available\"); }\nint main(){ add(101,\"Python Programming\"); add(102,\"Data Structures\"); add(103,\"Computer Networks\"); Book*b=find(102); if(b) b->issued=1; display(); return 0; }",
    procedure:
      "1. Initialize linked list book catalog with sample books: 101 Python Programming, 102 Data Structures, 103 Computer Networks.\n2. Add and search book records.\n3. Issue books through queue request logic using FCFS.\n4. Return books and update status.\n5. Display all books and transaction flow.",
    sampleOutput:
      "103 Computer Networks Available\n102 Data Structures Issued\n101 Python Programming Available",
    conclusion:
      "The mini project demonstrates real-world use of linked list and queue for efficient and extensible library management.",
  },
];
