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
    BoolCondition | ArithmeticCondition 
;

Expression returns Expression:
    setSpeed | getDistance | getTimestamp | ArithmeticExpression | BoolExpression | ArithmeticCondition
;

Unit returns Unit:
    mm | cm 
;

ArithmeticExpression returns ArithmeticExpression:
    ConstInt | Addition | Substraction | Multiplication | Division | FunCall | Var
;

BoolExpression returns BoolExpression:
    ConstBool | BoolCondition | FunCall | Var
;

ArithmeticCondition returns ArithmeticCondition:
    Lower | Greater | EqualInt | NotEqualInt
;

BoolCondition returns BoolCondition:
    EqualBool | NotEqualBool | And | Or 
;

Func returns Func:
    'let' ^type=Type name=STRING '(' (parameter+=Parameter  ("," parameter+=Parameter  )*)? ')' '{' (statement+=Statement  (statement+=Statement  )*) ? '}'  
;


Parameter returns Parameter:
    ^type=Type name=STRING 
;

If returns If:
    'If' condition=Condition '{' (statement+=Statement)* '}'  
;

Loop returns Loop:
    'Loop' condition=Condition '{' (statement+=Statement)* '}'  
;

Front returns Front:
    'Forward' expression=Expression unit1=Unit 
;

Back returns Back:
    'Backward' expression=Expression unit1=Unit 
;

RightSide returns RightSide:
    'Right' expression=Expression unit1=Unit
;

Rotation returns Rotation:
    'Clock' angle=INT
;

setSpeed returns setSpeed:
    'setSpeed('unit=Unit ')'  
;

getDistance returns getDistance:
    {getDistance} 'getDistance()'  
;

getTimestamp returns getTimestamp:
    {getTimestamp} 'getTimestamp()'  
;

declaVar returns declaVar:
    'var' ^type=Type name=STRING '=' expression=Expression  
;

FunCall returns FunCall:
    name=STRING '(' (expression+=Expression  ("," expression+=Expression)*)? ')'  
;

Return returns Return:
    'return' expression=Expression
;

AssignVar returns AssignVar:
    var=Var '=' expression=Expression  
;

LeftSide returns LeftSide:
    'LeftSide' expression=Expression unit1=Unit  
;

Lower returns Lower:
    arithmeticexpression1=ArithmeticExpression '<' arithmeticexpression2=ArithmeticExpression
;

Greater returns Greater:
    arithmeticexpression1=ArithmeticExpression '>' arithmeticexpression2=ArithmeticExpression
;

EqualInt returns EqualInt:
    arithmeticexpression1=ArithmeticExpression '==' arithmeticexpression2=ArithmeticExpression  
;

NotEqualInt returns NotEqualInt:
    arithmeticexpression1=ArithmeticExpression '!=' arithmeticexpression2=ArithmeticExpression
;
EqualBool returns EqualBool:
    booleanexpression1=BoolExpression '==' booleanexpression2=BoolExpression
;

NotEqualBool returns NotEqualBool:
    booleanexpression1=BoolExpression '!=' booleanexpression2=BoolExpression
;

And returns And:
    booleanexpression1=BoolExpression 'and' booleanexpression2=BoolExpression
;

Or returns Or:
    booleanexpression1=BoolExpression 'or' booleanexpression2=BoolExpression  
;

ConstInt returns ConstInt:
    integerValue=INT
;

Addition returns Addition:
    arithmeticexpression1=ArithmeticExpression '+' arithmeticexpression2=ArithmeticExpression  
;

Substraction returns Substraction:
    arithmeticexpression1=ArithmeticExpression '-' arithmeticexpression2=ArithmeticExpression
;

Multiplication returns Multiplication:
    arithmeticexpression1=ArithmeticExpression '*' arithmeticexpression2=ArithmeticExpression 
;

Division returns Division:
    arithmeticexpression1=ArithmeticExpression '/' arithmeticexpression2=ArithmeticExpression  
;

Var returns Var:
    name=STRING 
;

ConstBool returns ConstBool:
    BoolValue=BOOL  
;

mm returns mm:
    {mm} 'in' 'mm'
;

cm returns cm:
    {cm} 'in' 'cm' 
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

