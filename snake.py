import pygame
from settings import *

class Snake:
    def __init__(self):
        self.body = [(CELL_SIZE * 5, CELL_SIZE * 5),
                     (CELL_SIZE * 4, CELL_SIZE * 5),
                     (CELL_SIZE * 3, CELL_SIZE * 5)]
        self.direction = RIGHT
        self.grow = False

    def head_position(self):
        return self.body[0]

    def change_direction(self, new_direction):
        opposite_directions = {UP: DOWN, DOWN: UP, LEFT: RIGHT, RIGHT: LEFT}
        if new_direction != opposite_directions.get(self.direction):
            self.direction = new_direction

    def move(self):
        x, y = self.head_position()
        
        if self.direction == UP:
            y -= CELL_SIZE
        elif self.direction == DOWN:
            y += CELL_SIZE
        elif self.direction == LEFT:
            x -= CELL_SIZE
        elif self.direction == RIGHT:
            x += CELL_SIZE

        new_head = (x, y)
        self.body.insert(0, new_head)

        if self.grow:
            self.grow = False
        else:
            self.body.pop()

    def grow_snake(self):
        self.grow = True

    def check_collision(self):
        x, y = self.head_position()
        if x < 0 or x >= WINDOW_WIDTH or y < 0 or y >= WINDOW_HEIGHT:
            return True

        if self.head_position() in self.body[1:]:
            return True

        return False

    def draw(self, screen):
        for segment in self.body:
            pygame.draw.rect(screen, SNAKE_COLOR, 
                           pygame.Rect(segment[0], segment[1], CELL_SIZE, CELL_SIZE))
            pygame.draw.rect(screen, SNAKE_BORDER, 
                           pygame.Rect(segment[0], segment[1], CELL_SIZE, CELL_SIZE), 2)
