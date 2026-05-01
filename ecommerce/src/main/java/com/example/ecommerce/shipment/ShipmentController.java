package com.example.ecommerce.shipment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentRepository repo;

    @PostMapping
    public Shipment create(@RequestBody Shipment shipment) {
        shipment.setStatus("DISPATCHED");
        shipment.setTrackingNumber("TRK" + System.currentTimeMillis());
        return repo.save(shipment);
    }

    @GetMapping("/{id}")
    public Shipment track(@PathVariable Long id) {
        return repo.findById(id)
               .orElseThrow(() -> new RuntimeException("Shipment not found"));
    }
}