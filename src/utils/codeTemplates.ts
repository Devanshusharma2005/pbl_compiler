export function getDefaultCode(language: string): string {
  switch (language) {
    case 'py':
      return 'print("Hello from Python!")';
    
    case 'js':
      return 'console.log("Hello from JavaScript!");';
    
    case 'ts':
      return 'console.log("Hello from TypeScript!");';
    
    case 'java':
      return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}';
    
    case 'cpp':
      return '#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}';
    
    case 'c':
      return '#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}';
    
    case 'go':
      return 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}';
    
    case 'rs':
      return 'fn main() {\n    println!("Hello from Rust!");\n}';
    
    case 'kt':
      return 'fun main() {\n    println("Hello from Kotlin!")\n}';
    
    case 'cs':
      return 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello from C#!");\n    }\n}';
    
    case 'bac':
      return 'func main() {\n    print("Hello from BasicCode!\\n");\n}';
    
    default:
      return '// Start coding here';
  }
}