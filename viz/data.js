window.GRAPH = {
  "nodes": [
    {
      "id": "sample/animals.ts:Animal.report",
      "label": "sample/animals.ts:Animal.report"
    },
    {
      "id": "sample/animals.ts:demo",
      "label": "sample/animals.ts:demo"
    },
    {
      "id": "sample/animals.ts:mystery",
      "label": "sample/animals.ts:mystery"
    },
    {
      "id": "sample/geometry.ts:perimeter",
      "label": "sample/geometry.ts:perimeter"
    },
    {
      "id": "sample/geometry.ts:total",
      "label": "sample/geometry.ts:total"
    },
    {
      "id": "sample/handlers.ts:accumulate",
      "label": "sample/handlers.ts:accumulate"
    },
    {
      "id": "sample/handlers.ts:summarize",
      "label": "sample/handlers.ts:summarize"
    },
    {
      "id": "sample/handlers.ts:report",
      "label": "sample/handlers.ts:report"
    },
    {
      "id": "sample/math.ts:double",
      "label": "sample/math.ts:double"
    },
    {
      "id": "sample/math.ts:Calculator.square",
      "label": "sample/math.ts:Calculator.square"
    },
    {
      "id": "sample/math.ts:Calculator.cube",
      "label": "sample/math.ts:Calculator.cube"
    },
    {
      "id": "sample/math.ts:run",
      "label": "sample/math.ts:run"
    },
    {
      "id": "sample/animals.ts:Animal.speak",
      "label": "sample/animals.ts:Animal.speak"
    },
    {
      "id": "sample/animals.ts:Dog.speak",
      "label": "sample/animals.ts:Dog.speak"
    },
    {
      "id": "sample/math.ts:add",
      "label": "sample/math.ts:add"
    },
    {
      "id": "sample/handlers.ts:format",
      "label": "sample/handlers.ts:format"
    }
  ],
  "edges": [
    {
      "from": "sample/animals.ts:Animal.report",
      "to": "sample/animals.ts:Animal.speak"
    },
    {
      "from": "sample/animals.ts:demo",
      "to": "sample/animals.ts:Dog.speak"
    },
    {
      "from": "sample/animals.ts:demo",
      "to": "sample/animals.ts:Animal.speak"
    },
    {
      "from": "sample/animals.ts:mystery",
      "to": "sample/animals.ts:Animal.speak"
    },
    {
      "from": "sample/geometry.ts:perimeter",
      "to": "sample/math.ts:double"
    },
    {
      "from": "sample/geometry.ts:total",
      "to": "sample/math.ts:add"
    },
    {
      "from": "sample/handlers.ts:accumulate",
      "to": "sample/math.ts:add"
    },
    {
      "from": "sample/handlers.ts:summarize",
      "to": "sample/handlers.ts:accumulate"
    },
    {
      "from": "sample/handlers.ts:report",
      "to": "sample/handlers.ts:format"
    },
    {
      "from": "sample/handlers.ts:report",
      "to": "sample/handlers.ts:summarize"
    },
    {
      "from": "sample/math.ts:double",
      "to": "sample/math.ts:add"
    },
    {
      "from": "sample/math.ts:Calculator.square",
      "to": "sample/math.ts:double"
    },
    {
      "from": "sample/math.ts:Calculator.cube",
      "to": "sample/math.ts:Calculator.square"
    },
    {
      "from": "sample/math.ts:run",
      "to": "sample/math.ts:Calculator.square"
    }
  ]
};