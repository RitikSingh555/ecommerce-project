package com.example.ecommerce.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository repo;

    @PostMapping
    public Payment makePayment(@RequestBody Payment payment) {
        payment.setStatus("SUCCESS");
        return repo.save(payment);
    }

    @GetMapping("/order/{orderId}")
    public List<Payment> getByOrder(@PathVariable Long orderId) {
        return repo.findByOrderId(orderId);
    }
}