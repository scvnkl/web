PROGRAM SarahRevere(INPUT, OUTPUT);
USES
  DOS;

VAR
  QueryStr: STRING;

BEGIN {SarahRevere}
  WRITELN('Content-Type: text/plain');
  WRITELN;

  QueryStr := GetEnv('QUERY_STRING');

  IF QueryStr = '' 
  THEN
    BEGIN
      WRITELN('Error: No query parameters specified.');
      WRITELN('Usage: ?lanterns=1 or ?lanterns=2');
    END;

  IF Pos('lanterns=1', QueryStr) > 0 
  THEN
    WRITELN('The British are coming by land.')
  ELSE IF Pos('lanterns=2', QueryStr) > 0 
  THEN
    WRITELN('The British are coming by sea.')
  ELSE
    WRITELN('Sarah didn''t say anything.')
END. {SarahRevere}
