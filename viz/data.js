window.GRAPH = {
  "nodes": [
    {
      "id": "Animal.report",
      "label": "Animal.report"
    },
    {
      "id": "demo",
      "label": "demo"
    },
    {
      "id": "mystery",
      "label": "mystery"
    },
    {
      "id": "perimeter",
      "label": "perimeter"
    },
    {
      "id": "total",
      "label": "total"
    },
    {
      "id": "double",
      "label": "double"
    },
    {
      "id": "Calculator.square",
      "label": "Calculator.square"
    },
    {
      "id": "Calculator.cube",
      "label": "Calculator.cube"
    },
    {
      "id": "run",
      "label": "run"
    },
    {
      "id": "Animal.speak",
      "label": "Animal.speak"
    },
    {
      "id": "Dog.speak",
      "label": "Dog.speak"
    },
    {
      "id": "add",
      "label": "add"
    }
  ],
  "edges": [
    {
      "from": "Animal.report",
      "to": "Animal.speak"
    },
    {
      "from": "demo",
      "to": "Dog.speak"
    },
    {
      "from": "demo",
      "to": "Animal.speak"
    },
    {
      "from": "mystery",
      "to": "Animal.speak"
    },
    {
      "from": "perimeter",
      "to": "double"
    },
    {
      "from": "total",
      "to": "add"
    },
    {
      "from": "double",
      "to": "add"
    },
    {
      "from": "Calculator.square",
      "to": "double"
    },
    {
      "from": "Calculator.cube",
      "to": "Calculator.square"
    },
    {
      "from": "run",
      "to": "Calculator.square"
    }
  ]
};