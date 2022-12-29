package com.exam.utility;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> appExceptionHandler(Exception exp){
        ErrorInfo error = new ErrorInfo();
        error.setErrorMessage(exp.getMessage());
        error.setErrorCode(HttpStatus.BAD_REQUEST.value());
        error.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public ResponseEntity<ErrorInfo> exceptionHandler(Exception exp){
        ErrorInfo error = new ErrorInfo();
        error.setErrorCode(HttpStatus.BAD_REQUEST.value());

        String errorMsg = "";
        if(exp instanceof MethodArgumentNotValidException){
            MethodArgumentNotValidException exp1 = (MethodArgumentNotValidException) exp;
            errorMsg = exp1.getBindingResult().getAllErrors().stream().map(x -> x.getDefaultMessage())
                    .collect(Collectors.joining(", "));
        }else{
            ConstraintViolationException exp1 = (ConstraintViolationException) exp;
//            errorMsg = exp1.getConstraintViolations().stream().map(x -> x.getMessage())
//                    .collect(Collectors.joining(", "));
            errorMsg = exp1.getMessage();
        }


        error.setErrorMessage(errorMsg);
        error.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
