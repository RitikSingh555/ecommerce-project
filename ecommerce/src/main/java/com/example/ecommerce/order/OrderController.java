package com.example.ecommerce.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository repo;

    @GetMapping
    public List<Order> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        order.setStatus("PENDING");
        return repo.save(order);
    }

    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = repo.findById(id)
                     .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return repo.save(order);
    }
}