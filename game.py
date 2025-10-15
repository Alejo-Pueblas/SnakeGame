import pygame
from snake import Snake
from food import Food
from settings import *
from utils import draw_text_center

class Game:
    def __init__(self):
        self.screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        pygame.display.set_caption("Snake Game - Clásico")
        self.clock = pygame.time.Clock()
        self.running = True
        self.game_over = False
        self.reset_game()
    
    def reset_game(self):
        self.snake = Snake()
        self.food = Food()
        self.food.randomize(self.snake.body)
        self.score = 0
        self.current_fps = FPS_START
        self.game_over = False

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.running = False
            elif event.type == pygame.KEYDOWN:
                if self.game_over:
                    if event.key == pygame.K_SPACE:
                        self.reset_game()
                    elif event.key == pygame.K_ESCAPE:
                        self.running = False
                else:
                    if event.key == pygame.K_UP:
                        self.snake.change_direction(UP)
                    elif event.key == pygame.K_DOWN:
                        self.snake.change_direction(DOWN)
                    elif event.key == pygame.K_LEFT:
                        self.snake.change_direction(LEFT)
                    elif event.key == pygame.K_RIGHT:
                        self.snake.change_direction(RIGHT)

    def update(self):
        if self.game_over:
            return
            
        self.snake.move()
        
        if self.snake.head_position() == self.food.position:
            self.snake.grow_snake()
            self.food.randomize(self.snake.body)
            self.score += 1
            
            if self.current_fps < FPS_MAX:
                self.current_fps = min(self.current_fps + FPS_INCREMENT, FPS_MAX)
        
        if self.snake.check_collision():
            self.game_over = True

    def draw_checkered_background(self):
        for row in range(0, WINDOW_HEIGHT // CELL_SIZE):
            for col in range(0, WINDOW_WIDTH // CELL_SIZE):
                if (row + col) % 2 == 0:
                    color = BG_COLOR
                else:
                    color = BG_COLOR_ALT
                pygame.draw.rect(self.screen, color, 
                               pygame.Rect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE))
    
    def draw(self):
        self.draw_checkered_background()
        self.food.draw(self.screen)
        self.snake.draw(self.screen)
        
        font = pygame.font.SysFont(None, 36)
        text = font.render(f"Score: {self.score}", True, TEXT_COLOR)
        self.screen.blit(text, (10, 10))
        
        if self.game_over:
            overlay = pygame.Surface((WINDOW_WIDTH, WINDOW_HEIGHT))
            overlay.set_alpha(200)
            overlay.fill(GAME_OVER_BG)
            self.screen.blit(overlay, (0, 0))
            
            font_large = pygame.font.SysFont('Arial', 64, bold=True)
            font_medium = pygame.font.SysFont('Arial', 36, bold=True)
            font_small = pygame.font.SysFont('Arial', 28)
            
            text1 = font_large.render("GAME OVER", True, BG_COLOR)
            text2 = font_medium.render(f"Puntaje: {self.score}", True, BG_COLOR)
            text3 = font_small.render("Presiona ESPACIO para reiniciar", True, BG_COLOR_ALT)
            text4 = font_small.render("o ESC para salir", True, BG_COLOR_ALT)
            
            rect1 = text1.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 - 50))
            rect2 = text2.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 + 10))
            rect3 = text3.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 + 60))
            rect4 = text4.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 + 90))
            
            self.screen.blit(text1, rect1)
            self.screen.blit(text2, rect2)
            self.screen.blit(text3, rect3)
            self.screen.blit(text4, rect4)
        
        pygame.display.flip()

    def run(self):
        while self.running:
            self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(self.current_fps)
