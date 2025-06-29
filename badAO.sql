BEGIN
    FOR record IN (
        SELECT L.LoanID
        FROM Customers C
        JOIN Loans L ON C.CustomerID = L.CustomerID
        WHERE MONTHS_BETWEEN(SYSDATE, C.DOB) / 12 > 60
        FOR UPDATE
    ) LOOP
        UPDATE Loans 
        SET InterestRate = InterestRate * 0.99
        WHERE LoanID = record.LoanID;
    END LOOP;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('1% interest discount applied to customers above 60!');
END;
