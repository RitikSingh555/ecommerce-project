package com.example.ecommerce.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository repo;

    @PostMapping("/add")
    public Cart addItem(@RequestBody Cart cart) {
        return repo.save(cart);
    }

    @GetMapping("/user/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public String removeItem(@PathVariable Long id) {
        repo.deleteById(id);
        return "Item removed from cart";
    }
}

