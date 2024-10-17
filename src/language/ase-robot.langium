grammar AseRobot
import 'Terminals'
import 'tP_ASE-types'
import 'XMLType-types'

entry Program returns Program:
    Func+=Func  (Func+=Func  )* 
;

Statement returns Statement:
    If | Loop | Front | Back | RightSide | Rotation | setSpeed | declaVar | FunCall | Return | AssignVar | LeftSide 
;

Type returns Type:
    Nbr | Bool | Void 
;

Condition returns Condition:
    BoolCondition | ArithmeticCondition 
;

Expression returns Expression:
    getDistance | getTimestamp | ArithmeticExpression | BoolExpression | ArithmeticCondition
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
    AddExpression
;

AddExpression returns AddExpression:
    multexpression+=MultExpression (op=('+' | '-') multexpression+=MultExpression)* 
;

BoolExpression returns BoolExpression:
    SingleValueBool | BoolCondition
;

ArithmeticCondition returns ArithmeticCondition:
    Comparison
;

Comparison returns Comparison:
    Greater | Lower | EqualInt | NotEqualInt
;

BoolCondition returns BoolCondition:
    EqualBool | NotEqualBool | Or 
;

MultExpression returns MultExpression:
    (singlevalue+=SingleValue|'('singlevalue+=ArithmeticExpression')') (op=('*' | '/') (singlevalue+=SingleValue|'('singlevalue+=ArithmeticExpression')') )*
;

Func returns Func:
    'let' ^type=Type name=ID '(' (parameter+=Parameter  ("," parameter+=Parameter  )*)? ')' '{' (statement+=Statement  )* '}'  
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
    'Forward' expression=ArithmeticExpression unit1=Unit 
;

Back returns Back:
    'Backward' expression=ArithmeticExpression unit1=Unit 
;

RightSide returns RightSide:
    'Right' expression=ArithmeticExpression unit1=Unit
;

Rotation returns Rotation:
    'Clock' angle=ArithmeticExpression
;

setSpeed returns setSpeed:
    'setSpeed(' speed=ArithmeticExpression unit=Unit ')'  
;

getDistance returns getDistance:
    {getDistance} 'getDistance()'  
;

getTimestamp returns getTimestamp:
    {getTimestamp} 'getTimestamp()'  
;

declaVar returns declaVar:
    'var' ^type=Type declaName=ID '=' expression=Expression  
;

FunCall returns FunCall:
    callName=ID '(' (parameters+=Expression  ("," parameters+=Expression)*)? ')' | getDistance | getTimestamp
;

Return returns Return:
    'return' expression=Expression
;

AssignVar returns AssignVar:
    var_to_assign=Var '=' expression=Expression  
;

LeftSide returns LeftSide:
    'LeftSide' expression=ArithmeticExpression unit1=Unit  
;

Lower returns Lower:
    arithmeticexpression+=ArithmeticExpression ('<' arithmeticexpression+=ArithmeticExpression)
;

Greater returns Greater:
    arithmeticexpression+=ArithmeticExpression ('>' arithmeticexpression+=ArithmeticExpression)
;

EqualInt returns EqualInt:
    arithmeticexpression+=ArithmeticExpression ('==' arithmeticexpression+=ArithmeticExpression)
;

NotEqualInt returns NotEqualInt:
    arithmeticexpression+=ArithmeticExpression ('!=' arithmeticexpression+=ArithmeticExpression)
;
EqualBool returns EqualBool:
    singlevaluebool+=SingleValueBool '==' singlevaluebool+=SingleValueBool
;

NotEqualBool returns NotEqualBool:
    singlevaluebool+=SingleValueBool '!=' singlevaluebool+=SingleValueBool
;

And returns And:
     (singlevaluebool+=SingleValueBool | '('?comparison+=Comparison ')'?) ('and'(singlevaluebool+=SingleValueBool | '('? comparison+=Comparison ')'?))*
;

Or returns Or:
    (and+=And | comparison+=Comparison) ('or' (and+=And | comparison+=Comparison))*
;

ConstInt returns ConstInt:
    integerValue=INT
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

