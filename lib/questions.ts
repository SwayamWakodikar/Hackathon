// lib/questions.ts

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface CompanyQuiz {
  name: string;
  description: string;
  questions: Question[];
}

export const MOCK_QUESTIONS_DATA: Record<string, CompanyQuiz> = {
  google: {
    name: "Google",
    description: "Focus on DSA, System Design, and Go/Python.",
    questions: [
      { id: 1, question: "What is the average time complexity of QuickSort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: "O(n log n)" },
      { id: 2, question: "Which Google service is used for container orchestration?", options: ["GKE", "BigQuery", "Compute Engine", "App Engine"], answer: "GKE" },
      { id: 3, question: "What data structure would you use to implement autocomplete?", options: ["Trie", "Array", "Linked List", "Stack"], answer: "Trie" },
      { id: 4, question: "Explain the difference between process and thread.", options: ["Processes have separate memory, threads share memory", "Threads have separate memory", "Both are identical", "Process is lighter than thread"], answer: "Processes have separate memory, threads share memory" },
      { id: 5, question: "What is the CAP theorem?", options: ["Consistency, Availability, Partition Tolerance", "Cost, Availability, Performance", "Concurrency, Atomicity, Persistence", "Consistency, Atomicity, Partition"], answer: "Consistency, Availability, Partition Tolerance" },
      { id: 6, question: "How does MapReduce work?", options: ["Map processes data, Reduce aggregates results", "Reduce processes data", "Only Map phase", "Only Reduce phase"], answer: "Map processes data, Reduce aggregates results" },
      { id: 7, question: "What is a B-tree and where is it used?", options: ["Self-balancing tree used in databases", "Binary search tree", "Hash table implementation", "Graph data structure"], answer: "Self-balancing tree used in databases" },
      { id: 8, question: "Explain consistent hashing.", options: ["Minimizes redistribution when hash table resizes", "Always produces same hash", "Linear hashing method", "Double hashing technique"], answer: "Minimizes redistribution when hash table resizes" },
      { id: 9, question: "What is BigTable?", options: ["Google's distributed storage system", "Google's search algorithm", "Google's caching layer", "Google's load balancer"], answer: "Google's distributed storage system" },
      { id: 10, question: "Difference between TCP and UDP.", options: ["TCP reliable, UDP unreliable", "UDP reliable, TCP unreliable", "Both are unreliable", "Both are reliable"], answer: "TCP reliable, UDP unreliable" },
      { id: 11, question: "What is a deadlock?", options: ["Two or more processes waiting for each other", "Process termination", "Memory leak", "Infinite loop"], answer: "Two or more processes waiting for each other" },
      { id: 12, question: "Explain LRU cache implementation.", options: ["Hash Map + Doubly Linked List", "Array + Queue", "Binary Search Tree", "Stack"], answer: "Hash Map + Doubly Linked List" },
      { id: 13, question: "What is time complexity of hash table lookup?", options: ["O(1) average", "O(n) average", "O(log n) average", "O(n²) average"], answer: "O(1) average" },
      { id: 14, question: "How does Google search handle typos?", options: ["Edit distance algorithms", "Ignore typos", "Exact match only", "Soundex algorithm"], answer: "Edit distance algorithms" },
      { id: 15, question: "What is sharding?", options: ["Horizontal partitioning of databases", "Vertical partitioning", "Data compression", "Data encryption"], answer: "Horizontal partitioning of databases" },
      { id: 16, question: "Explain Paxos algorithm.", options: ["Consensus algorithm for distributed systems", "Sorting algorithm", "Search algorithm", "Encryption algorithm"], answer: "Consensus algorithm for distributed systems" },
      { id: 17, question: "What is load balancing?", options: ["Distributing traffic across servers", "Balancing CPU load", "Memory balancing", "Disk balancing"], answer: "Distributing traffic across servers" },
      { id: 18, question: "How does garbage collection work?", options: ["Reclaims unused memory automatically", "Manual memory management", "Database cleanup", "Network cleanup"], answer: "Reclaims unused memory automatically" },
      { id: 19, question: "What is a bloom filter?", options: ["Probabilistic data structure for membership", "Deterministic data structure", "Sorting algorithm", "Encryption method"], answer: "Probabilistic data structure for membership" },
      { id: 20, question: "Explain REST API design principles.", options: ["Stateless, cacheable, uniform interface", "Stateful, non-cacheable", "Session-based", "Connection-oriented"], answer: "Stateless, cacheable, uniform interface" }
    ]
  },
  amazon: {
    name: "Amazon",
    description: "Emphasis on Leadership Principles and Scalability.",
    questions: [
      { id: 1, question: "Which AWS service provides resizable compute capacity?", options: ["S3", "EC2", "Lambda", "RDS"], answer: "EC2" },
      { id: 2, question: "Which Leadership Principle emphasizes 'Hiring and Developing the Best'?", options: ["Ownership", "Dive Deep", "Hire and Develop the Best", "Frugality"], answer: "Hire and Develop the Best" },
      { id: 3, question: "What is eventual consistency?", options: ["Data becomes consistent after some time", "Strong consistency always", "No consistency", "Immediate consistency"], answer: "Data becomes consistent after some time" },
      { id: 4, question: "Difference between S3 and EBS.", options: ["S3 object storage, EBS block storage", "EBS object storage", "Both object storage", "Both block storage"], answer: "S3 object storage, EBS block storage" },
      { id: 5, question: "Explain DynamoDB's primary key.", options: ["Partition key or Partition+Sort key", "Only Sort key", "No primary key", "Composite key only"], answer: "Partition key or Partition+Sort key" },
      { id: 6, question: "What is Auto Scaling?", options: ["Automatically adjusts capacity", "Manual scaling", "Only scales down", "Only for EC2 Classic"], answer: "Automatically adjusts capacity" },
      { id: 7, question: "Explain 'Customer Obsession'.", options: ["Start with customer", "Focus on competitors", "Technical excellence first", "Shareholder value first"], answer: "Start with customer" },
      { id: 8, question: "What is AWS Lambda?", options: ["Serverless compute", "Always-running instances", "Manual invocation only", "Batch processing only"], answer: "Serverless compute" },
      { id: 9, question: "How does Amazon's recommendation work?", options: ["Collaborative filtering", "Only content filtering", "Random selection", "Manual curation"], answer: "Collaborative filtering" },
      { id: 10, question: "What is 'Two Pizza Team' rule?", options: ["Teams small enough for two pizzas", "Pizza budget rule", "Team ordering rule", "Lunch policy"], answer: "Teams small enough for two pizzas" },
      { id: 11, question: "Explain 'Ownership' principle.", options: ["Leaders own results", "Delegate responsibility", "Avoid accountability", "Blame others"], answer: "Leaders own results" },
      { id: 12, question: "What is VPC?", options: ["Virtual Private Cloud", "Virtual Public Cloud", "Visual Programming Cloud", "Video Processing Cloud"], answer: "Virtual Private Cloud" },
      { id: 13, question: "How does S3 achieve durability?", options: ["Data replication across AZs", "Single copy storage", "No replication", "Local storage only"], answer: "Data replication across AZs" },
      { id: 14, question: "What is CloudFront?", options: ["Content Delivery Network", "Compute service", "Database service", "Analytics service"], answer: "Content Delivery Network" },
      { id: 15, question: "Explain 'Dive Deep'.", options: ["Leaders operate at all levels", "Only high-level view", "Avoid details", "Delegate all details"], answer: "Leaders operate at all levels" },
      { id: 16, question: "What is Redshift?", options: ["Data warehouse service", "Real-time database", "File storage", "Compute service"], answer: "Data warehouse service" },
      { id: 17, question: "How does Route 53 work?", options: ["DNS web service", "Load balancer", "Database service", "Compute service"], answer: "DNS web service" },
      { id: 18, question: "Explain 'Invent and Simplify'.", options: ["Innovate and simplify solutions", "Copy competitors", "Complicate solutions", "Avoid innovation"], answer: "Innovate and simplify solutions" },
      { id: 19, question: "What is IAM?", options: ["Identity and Access Management", "Instance Availability Manager", "Internet Access Module", "Integrated Application Manager"], answer: "Identity and Access Management" },
      { id: 20, question: "How does DynamoDB handle scaling?", options: ["Automatic partitioning", "Manual partitioning", "No scaling", "Vertical scaling only"], answer: "Automatic partitioning" }
    ]
  },
  microsoft: {
    name: "Microsoft",
    description: "Tests on OS fundamentals, C#, and Azure ecosystem.",
    questions: [
      { id: 1, question: "Which language is primarily used for Windows desktop development?", options: ["Swift", "C#", "Kotlin", "Go"], answer: "C#" },
      { id: 2, question: "What is the Garbage Collector in .NET?", options: ["Automatic memory management", "Manual memory management", "Database cleaner", "Network garbage collector"], answer: "Automatic memory management" },
      { id: 3, question: "Difference between value and reference types in C#.", options: ["Value stores data directly", "Reference stores data directly", "Both store references", "Both store data directly"], answer: "Value stores data directly" },
      { id: 4, question: "What is Azure Active Directory?", options: ["Cloud identity service", "Storage service", "Compute service", "Database service"], answer: "Cloud identity service" },
      { id: 5, question: "Explain virtual memory.", options: ["Disk extension of RAM", "Physical memory only", "CPU cache", "GPU memory"], answer: "Disk extension of RAM" },
      { id: 6, question: "Difference between process and thread.", options: ["Process has own memory", "Thread has own memory", "Both identical", "Process lighter"], answer: "Process has own memory" },
      { id: 7, question: "What is Azure Functions?", options: ["Serverless compute", "Virtual machine", "Container service", "Database"], answer: "Serverless compute" },
      { id: 8, question: "Explain async/await in C#.", options: ["Asynchronous programming", "Synchronous programming", "Error handling", "Memory allocation"], answer: "Asynchronous programming" },
      { id: 9, question: "What is WSL?", options: ["Run Linux binaries on Windows", "Windows version of Linux", "Linux emulator", "VM manager"], answer: "Run Linux binaries on Windows" },
      { id: 10, question: "What is .NET Core?", options: ["Cross-platform .NET", "Windows-only .NET", "Old .NET framework", "Database framework"], answer: "Cross-platform .NET" },
      { id: 11, question: "Explain polymorphism in OOP.", options: ["Same interface, different implementation", "Different interface", "Single implementation", "No inheritance"], answer: "Same interface, different implementation" },
      { id: 12, question: "What is Azure Blob Storage?", options: ["Object storage service", "Block storage", "File storage", "Database"], answer: "Object storage service" },
      { id: 13, question: "How does Windows handle processes?", options: ["Process Control Block", "Thread Control Block", "Memory Block", "File Block"], answer: "Process Control Block" },
      { id: 14, question: "What is LINQ?", options: ["Language Integrated Query", "Database only", "Network query", "File query"], answer: "Language Integrated Query" },
      { id: 15, question: "Explain dependency injection.", options: ["Invert control of dependencies", "Hardcode dependencies", "Avoid dependencies", "Manual dependency creation"], answer: "Invert control of dependencies" },
      { id: 16, question: "What is Azure SQL Database?", options: ["Managed SQL database", "NoSQL database", "File storage", "Compute service"], answer: "Managed SQL database" },
      { id: 17, question: "How does .NET JIT work?", options: ["Compiles IL to native at runtime", "Pre-compiles all code", "Interprets code", "No compilation"], answer: "Compiles IL to native at runtime" },
      { id: 18, question: "What is Windows Registry?", options: ["Hierarchical database for settings", "File system", "Memory database", "Network configuration"], answer: "Hierarchical database for settings" },
      { id: 19, question: "Explain abstract class vs interface.", options: ["Abstract can have implementation", "Interface only signatures", "Both same", "Neither can have implementation"], answer: "Abstract can have implementation" },
      { id: 20, question: "What is Azure Kubernetes Service?", options: ["Managed Kubernetes", "Container registry", "Serverless compute", "Database service"], answer: "Managed Kubernetes" }
    ]
  },
  apple: {
    name: "Apple",
    description: "Advanced Low-level programming and Swift/Objective-C.",
    questions: [
      { id: 1, question: "Which framework is used for building UI on iOS?", options: ["React Native", "SwiftUI", "Flutter", "Xamarin"], answer: "SwiftUI" },
      { id: 2, question: "What is ARC in iOS?", options: ["Automatic Reference Counting", "Automatic Resource Cleaner", "Apple Runtime Compiler", "Application Response Checker"], answer: "Automatic Reference Counting" },
      { id: 3, question: "Difference between weak and strong references.", options: ["Strong increases retain count", "Weak increases retain count", "Both increase", "Neither affects"], answer: "Strong increases retain count" },
      { id: 4, question: "What is Grand Central Dispatch?", options: ["Concurrency framework", "Database framework", "Networking framework", "UI framework"], answer: "Concurrency framework" },
      { id: 5, question: "Difference between struct and class in Swift.", options: ["Struct value type, class reference", "Class value type", "Both value types", "Both reference types"], answer: "Struct value type, class reference" },
      { id: 6, question: "Explain View Controller lifecycle.", options: ["viewDidLoad, viewWillAppear", "init, dealloc", "start, stop", "create, delete"], answer: "viewDidLoad, viewWillAppear" },
      { id: 7, question: "What is Core Data?", options: ["Persistence framework", "Networking framework", "Animation framework", "Testing framework"], answer: "Persistence framework" },
      { id: 8, question: "What is Metal?", options: ["Low-level graphics API", "High-level UI framework", "Database system", "Networking protocol"], answer: "Low-level graphics API" },
      { id: 9, question: "Explain optionals in Swift.", options: ["Represent absence of value", "Always contain value", "Only for strings", "Only for integers"], answer: "Represent absence of value" },
      { id: 10, question: "Difference between frame and bounds.", options: ["Frame relative to superview", "Bounds relative to superview", "Both identical", "Frame 3D"], answer: "Frame relative to superview" },
      { id: 11, question: "What is delegation pattern?", options: ["One-to-one communication", "One-to-many", "Many-to-many", "No communication"], answer: "One-to-one communication" },
      { id: 12, question: "Explain MVC in iOS.", options: ["Model-View-Controller", "Model-View-ViewModel", "View-Model-Controller", "Service-View-Controller"], answer: "Model-View-Controller" },
      { id: 13, question: "What is Auto Layout?", options: ["Dynamic UI layout", "Static layout", "Manual layout", "No layout system"], answer: "Dynamic UI layout" },
      { id: 14, question: "How does memory management work in Swift?", options: ["ARC automatically manages", "Manual management", "Garbage collection", "Reference counting manual"], answer: "ARC automatically manages" },
      { id: 15, question: "What is Combine framework?", options: ["Reactive programming", "Database framework", "Networking framework", "UI framework"], answer: "Reactive programming" },
      { id: 16, question: "Explain protocol-oriented programming.", options: ["Protocols as primary abstraction", "Classes as primary", "Structs only", "No protocols"], answer: "Protocols as primary abstraction" },
      { id: 17, question: "What is Core Animation?", options: ["Animation framework", "Database framework", "Networking framework", "Testing framework"], answer: "Animation framework" },
      { id: 18, question: "How does Swift handle error handling?", options: ["try-catch-throw", "Only return codes", "No error handling", "Global error handler"], answer: "try-catch-throw" },
      { id: 19, question: "What is UIKit?", options: ["iOS UI framework", "macOS framework", "watchOS only", "tvOS only"], answer: "iOS UI framework" },
      { id: 20, question: "Explain difference between let and var.", options: ["let constant, var variable", "var constant, let variable", "Both mutable", "Both immutable"], answer: "let constant, var variable" }
    ]
  }
};