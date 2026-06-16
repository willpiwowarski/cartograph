class Animal {
  speak(): string {
    return "...";
  }
  report(): string {
    return this.speak();   // static type of `this` here is Animal
  }
}

class Dog extends Animal {
  speak(): string {        // override
    return "Woof";
  }
}

class Cat extends Animal {
  // no override — inherits Animal.speak
}

function demo(): void {
  const dog = new Dog();
  dog.speak();             // Dog overrides → should resolve to Dog.speak

  const cat = new Cat();
  cat.speak();             // Cat inherits → should resolve to Animal.speak
}

// resolveCalleeSymbol resolves method calls against the receiver's *static*
// (declared) type. Runtime dynamic dispatch — e.g. an `Animal` variable
// holding a `Dog` — is undecidable in general and intentionally not tracked.
function mystery(): void {
  const thing: Animal = new Dog();  // declared Animal, actually a Dog
  thing.speak();                    // ← the interesting one
}