grammar AseRobot
import 'Terminals'
import 'tP_ASE-types'
import 'XMLType-types'

entry Program returns Program:
    'Program' '{' Func+=Func  (Func+=Func  )* '}'  
;

Statement returns Statement:
    If | Loop | Front | Back | RightSide | Rotation | setSpeed | getDistance | getTimestamp | declaVar | FunCall | Return | AssignVar | LeftSide 
;

Type returns Type:
    Nbr | Bool | Void 
;

Condition returns Condition:
    Lower | Greater | Equal | NotEqual | And | Or 
;

Expression returns Expression:
    setSpeed | getDistance | getTimestamp | ConstInt | Addition | Substraction | Multiplication | Division | Lower | Greater | Equal | NotEqual | FunCall | Var | ConstBool | And | Or 
;

Unit returns Unit:
    mm | cm 
;

ArithmeticExpression returns ArithmeticExpression:
    ConstInt | Addition | Substraction | Multiplication | Division | FunCall | Var 
;

Func returns Func:
    'let' ^type=Type name=STRING '(' ('parameter' '{' parameter+=Parameter  ("," parameter+=Parameter  )* '}' )? ')' '{' (statement+=Statement  (statement+=Statement  )*) ? '}'  
;

Str0 returns Str:
    'Str' 
;

Parameter returns Parameter:
    'Parameter' '{' ('name' name=STRING )? 'type' ^type=Type  '}'  
;

If returns If:
    'If' '{' 'condition' condition=Condition  ('statement' '{' statement+=Statement  ("," statement+=Statement  )* '}' )? '}'  
;

Loop returns Loop:
    'Loop' '{' 'condition' condition=Condition  ('statement' '{' statement+=Statement  ("," statement+=Statement  )* '}' )? '}'  
;

Front returns Front:
    'Front' '{' 'expression' expression=Expression  'unit1' unit1=Unit  '}'  
;

Back returns Back:
    'Back' '{' 'expression' expression=Expression  'unit1' unit1=Unit  '}'  
;

RightSide returns RightSide:
    'RightSide' '{' 'expression' expression=Expression  'unit1' unit1=Unit  '}'  
;

Rotation returns Rotation:
    {Rotation} 'Rotation' '{' ('angle' angle=Int0  )? '}'  
;

setSpeed returns setSpeed:
    'setSpeed' '{' 'unit' unit=Unit  '}'  
;

getDistance returns getDistance:
    {getDistance} 'getDistance'  
;

getTimestamp returns getTimestamp:
    {getTimestamp} 'getTimestamp'  
;

declaVar returns declaVar:
    'declaVar' '{' ('name' name=Str0  )? 'type' ^type=Type  'expression' expression=Expression  '}'  
;

FunCall returns FunCall:
    {FunCall} 'FunCall' '{' ('name' name=Str0  )? '}'  
;

Return returns Return:
    'Return' '{' 'expression' expression=Expression  '}'  
;

AssignVar returns AssignVar:
    'AssignVar' '{' 'var' var=Var  'expression' expression=Expression  '}'  
;

LeftSide returns LeftSide:
    'LeftSide' '{' 'expression' expression=Expression  'unit1' unit1=Unit  '}'  
;

Lower returns Lower:
    'Lower' '{' 'expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' 'arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' '}'  
;

Greater returns Greater:
    'Greater' '{' 'expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' 'arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' '}'  
;

Equal returns Equal:
    'Equal' '{' 'expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' 'arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' '}'  
;

NotEqual returns NotEqual:
    'NotEqual' '{' 'expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' 'arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' '}'  
;

And returns And:
    'And' '{' 'expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' '}'  
;

Or returns Or:
    'Or' '{' 'expression' '{' expression+=Expression  ("," expression+=Expression  )* '}' '}'  
;

ConstInt returns ConstInt:
    {ConstInt} 'ConstInt' '{' ('integerValue' integerValue=Int0  )? '}'  
;

Addition returns Addition:
    'Addition' '{' 'arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' '}'  
;

Substraction returns Substraction:
    'Substraction' '{' 'arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' '}'  
;

Multiplication returns Multiplication:
    'Multiplication' '{' 'arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' '}'  
;

Division returns Division:
    'Division' '{' 'arithmeticexpression' '{' arithmeticexpression+=ArithmeticExpression  ("," arithmeticexpression+=ArithmeticExpression  )* '}' '}'  
;

Var returns Var:
    {Var} 'Var' '{' ('name' name=Str0  )? '}'  
;

ConstBool returns ConstBool:
    {ConstBool} 'ConstBool' '{' ('BoolValue' BoolValue=Bool0  )? '}'  
;

Int0 returns Int:
    'Int' 
;

Bool0 returns Boolean:
    'Boolean' 
;

mm returns mm:
    {mm} 'mm'  
;

cm returns cm:
    {cm} 'cm'  
;

Nbr returns Nbr:
    {Nbr} 'Nbr'  
;

Bool returns Bool:
    {Bool} 'Bool'  
;

Void returns Void:
    {Void} 'Void'  
;

