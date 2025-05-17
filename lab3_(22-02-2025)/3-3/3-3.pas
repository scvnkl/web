PROGRAM GreetUser(INPUT, OUTPUT);
USES
  DOS;

VAR
  QueryString, Name: STRING;
  PosName, PosAmp: INTEGER;

BEGIN {GreetUser}
  WRITELN('Content-Type: text/plain');
  WRITELN;

  QueryString := GetEnv('QUERY_STRING');
  
  { Ищем параметр name= в строке запроса }
  PosName := Pos('name=', QueryString);
  
  IF PosName > 0 
  THEN
    BEGIN
      { Обрезаем строку, начиная с name= }
      Name := Copy(QueryString, PosName + 5, Length(QueryString));
      
      { Проверяем, есть ли после имени другие параметры (знак &) }
      PosAmp := Pos('&', Name);
      IF PosAmp > 0 
      THEN
        Name := Copy(Name, 1, PosAmp - 1); { Обрезаем до & }
        
      { Если имя не пустое }
      IF Name <> '' 
      THEN
        WRITELN('Hello dear, ', Name, '!')
      ELSE
        WRITELN('Hello Anonymous!')
    END
  ELSE
    WRITELN('Hello Anonymous!')
END. {GreetUser}