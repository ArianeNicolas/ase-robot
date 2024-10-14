grammar AseRobot
import 'Terminals'
import 'tP_ASE-types'
import 'XMLType-types'

entry Program returns Program:
    Func+=Func  (Func+=Func  )* 
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

SingleValue returns SingleValue:
    FunCall | Var | ConstInt
;

SingleValueBool returns SingleValueBool:
    ConstBool | Var | FunCall
;

ArithmeticExpression returns ArithmeticExpression:
    Addition | SingleValue | Multiplication
; 

BoolExpression returns BoolExpression:
    SingleValueBool | BoolCondition
;

ArithmeticCondition returns ArithmeticCondition:
    Comparison
;

BoolCondition returns BoolCondition:
    EqualBool | NotEqualBool | Or 
;


Func returns Func:
    'let' ^type=Type name=ID '(' (parameter+=Parameter  ("," parameter+=Parameter  )*)? ')' '{' (statement+=Statement  (statement+=Statement  )*) ? '}'  
;


Parameter returns Parameter:
    ^type=Type name=ID 
;

If returns If:
    'if' condition=Condition '{' (statement+=Statement)* '}'  elseif+=Elseif* else=Else?
;

Elseif returns Elseif:
    'else' 'if' condition=Condition '{' (statement+=Statement)* '}'  
;

Else returns Else:
    'else' '{' (statement+=Statement)* '}'  
;

Loop returns Loop:
    'loop' condition=Condition '{' (statement+=Statement)* '}'  
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
    'setSpeed(' speed=INT unit=Unit ')'  
;

getDistance returns getDistance:
    {getDistance} 'getDistance()'  
;

getTimestamp returns getTimestamp:
    {getTimestamp} 'getTimestamp()'  
;

declaVar returns declaVar:
    'var' ^type=Type name=ID '=' expression=Expression  
;

FunCall returns FunCall:
    name=ID '(' (expression+=Expression  ("," expression+=Expression)*)? ')'  
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

Comparison returns Comparison:
    arithmeticexpression+=ArithmeticExpression ('<' | '>' | '==' | '!=') arithmeticexpression+=ArithmeticExpression
;
// Lower returns Lower:
//     arithmeticexpression+=ArithmeticExpression ('<' arithmeticexpression+=ArithmeticExpression)*
// ;

// Greater returns Greater:
//     arithmeticexpression+=ArithmeticExpression ('>' arithmeticexpression+=ArithmeticExpression)*
// ;

// EqualInt returns EqualInt:
//     arithmeticexpression+=ArithmeticExpression ('==' arithmeticexpression+=ArithmeticExpression)* 
// ;

// NotEqualInt returns NotEqualInt:
//     arithmeticexpression+=ArithmeticExpression ('!=' arithmeticexpression+=ArithmeticExpression)*
// ;
EqualBool returns EqualBool:
    singlevaluebool+=SingleValueBool '==' singlevaluebool+=SingleValueBool
;

NotEqualBool returns NotEqualBool:
    singlevaluebool+=SingleValueBool '!=' singlevaluebool+=SingleValueBool
;

And returns And:
    '('? (singlevaluebool+=SingleValueBool | comparison+=Comparison )')'? ('and' '('?(singlevaluebool+=SingleValueBool | comparison+=Comparison)')'?)*
;

Or returns Or:
    (and+=And | comparison+=Comparison) ('or' (and+=And | comparison+=Comparison))*
;

ConstInt returns ConstInt:
    integerValue=INT
;

Addition returns Addition:
    multiplication+=Multiplication ('('? ('+'|'-') (multiplication+=Multiplication)*')'?)?
;

Multiplication returns Multiplication:
    singlevalue+=SingleValue ('('? ('*'|'/') (singlevalue+=SingleValue)*')'?)?
;

Var returns Var:
    name=ID 
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
    {Nbr} 'number'  
;

Bool returns Bool:
    {Bool} 'bool'  
;

Void returns Void:
    {Void} 'void'  
;

