# **Overall Conventions Document**

TypeScript conventions - [HERE](https://basarat.gitbook.io/typescript/styleguide)  
General practices to follow - [HERE](https://blogs.halodoc.io/angular-best-practices/)

## **Pull Request naming**

    [{type}] #{task number} - {title}

Example:
``[SIP] #0001 - Sample PR``  
Types:

- [SIP] - feature
- [FIX] - bug fix / refactoring  
- [TEST] -  unit tests

When PR consist more task concatenate them like this: ``[SIP] #0001 / #0002 / #0003 - Sample PR``

## **Branch naming**

Start with ``feature/`` and task number and title all with **kebab-case**

    feature/{task number}-{title}## 

Example:

```
feature/0001-initialize-angular-project
```

## **Project Architecture**

- App folder
  
  - Services
  - Modules
    - Core
    - Book
    - User
    - and etc.
  - Shared
    - Guards
    - Interfaces
    - Constants - any static / const classes
    - Directives
    - Pipes
    - and etc.

## **Folder / File naming**

Root folders must start with **uppercase** (Services, Guards etc.).  
For long file names use **kebab-case**.  
Name of type must represent in file names:  

For example:  

- **.interface.ts**  

- **.enum.ts**  

- **.component.ts**  

- **.service.ts**  

- **.guard.ts** and etc.  

## **Class names**

Class names must be **PascalCase**.  

Example:  
**PathGuard**, **FooterComponent**, **HomeService** and etc.  

For interfaces add ``I`` in front of it: **IHomeModel**, **ILoginView** and etc.  

Also for components: **remove empty methods / constructors!**  

## **Methods**

Methods must take strict types and return an strict types!  

Example:  

```typescript
interface A {
  name:string
}

interface B {
  name: string
}

class Example {
  GetSomething(a: A): B{
    return result: B = { name: "test" }
  } 
} 
```

## File formatting & Linting

We are using **ESLINT** for linting and **Prettier** as default formater.

## Static properties & enums

We are using **PascalCase** for constants:

```typescript
export class Account {
  static ForgetPassword = `/Account/ForgetPassword`;
  static ResetPassword = `/Account/ResetPassword`;
}
```

We are using **snake_case** with Capital letters for regexes:

```typescript
export class Regexes {
  static EMAIL_PATTERN = /REGEX/;
  static PASSWORD_PATTERN = /REGEX/;
  static PHONE_NUMBER_PATTERN = /REGEX/;
}
```
